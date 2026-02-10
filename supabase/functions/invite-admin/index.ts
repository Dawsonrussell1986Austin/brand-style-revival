import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    // Verify the caller is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const anonClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await anonClient.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check caller is admin
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: callerRoles } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin");

    if (!callerRoles || callerRoles.length === 0) {
      return new Response(JSON.stringify({ error: "Only admins can invite users" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { email, role } = await req.json();
    if (!email || !role || !["admin", "editor"].includes(role)) {
      return new Response(JSON.stringify({ error: "Valid email and role (admin/editor) required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user already exists
    const { data: existingUsers } = await adminClient.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    let userId: string;
    let isNewUser = false;

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create an invited user with a random password (they'll reset it)
      const tempPassword = crypto.randomUUID() + "Aa1!";
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
      });
      if (createError || !newUser.user) {
        return new Response(JSON.stringify({ error: createError?.message || "Failed to create user" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      userId = newUser.user.id;
      isNewUser = true;
    }

    // Check if role already exists
    const { data: existingRole } = await adminClient
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", role);

    if (existingRole && existingRole.length > 0) {
      return new Response(JSON.stringify({ error: "User already has this role" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Add role
    const { error: roleError } = await adminClient
      .from("user_roles")
      .insert({ user_id: userId, role });

    if (roleError) {
      return new Response(JSON.stringify({ error: roleError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email notification if Resend is configured
    let emailSent = false;
    if (resendApiKey && isNewUser) {
      try {
        // Generate a password reset link so the new admin can set their password
        const { data: resetData, error: resetError } = await adminClient.auth.admin.generateLink({
          type: "recovery",
          email,
        });

        const resetUrl = resetData?.properties?.action_link || null;

        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "ACES PDSI <onboarding@resend.dev>",
          to: [email],
          subject: `You've been invited as an ${role} on ACES PDSI`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #1e293b; font-size: 24px; margin: 0;">Welcome to ACES PDSI</h1>
              </div>
              <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                You've been invited as an <strong>${role}</strong> on the ACES PDSI website. 
                You now have access to the content management system.
              </p>
              ${resetUrl ? `
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="background: #2563eb; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                  Set Your Password
                </a>
              </div>
              <p style="color: #64748b; font-size: 14px; line-height: 1.5;">
                Click the button above to set your password and access the CMS. This link will expire in 24 hours.
              </p>
              ` : `
              <p style="color: #64748b; font-size: 14px; line-height: 1.5;">
                Please visit the admin login page and use "Forgot Password" to set up your account.
              </p>
              `}
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
              <p style="color: #94a3b8; font-size: 12px; text-align: center;">
                ACES PDSI · Professional Development & School Improvement
              </p>
            </div>
          `,
        });
        emailSent = true;
        console.log(`Invite email sent to ${email}`);
      } catch (emailError) {
        console.error("Failed to send invite email:", emailError);
        // Don't fail the whole request if email fails — the user was still created
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        userId, 
        message: `${email} added as ${role}`,
        emailSent,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
