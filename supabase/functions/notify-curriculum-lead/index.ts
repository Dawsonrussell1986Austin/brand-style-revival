import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTIFY_TO = ["bhutchins@aces.org", "jewhite@aces.org"];

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]!));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      firstName = "",
      lastName = "",
      email = "",
      organization = "",
      role = "",
      formType = "Curriculum Creator",
    } = body ?? {};

    if (!email || !firstName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(apiKey);
    const fullName = `${firstName} ${lastName}`.trim();

    const html = `
      <h2>New ${escapeHtml(formType)} Lead</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(organization || "—")}</p>
      <p><strong>Role:</strong> ${escapeHtml(role || "—")}</p>
      <p><strong>Source:</strong> ${escapeHtml(formType)} (acespdsi.org/curriculum-creator)</p>
    `;

    const { error } = await resend.emails.send({
      from: "ACES PDSI Leads <onboarding@resend.dev>",
      to: NOTIFY_TO,
      reply_to: email,
      subject: `New ${formType} lead: ${fullName}`,
      html,
    });

    if (error) {
      console.error("notify-curriculum-lead resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-curriculum-lead error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});