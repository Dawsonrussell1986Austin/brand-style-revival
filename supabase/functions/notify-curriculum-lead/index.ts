import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTIFY_TO = ["jewhite@aces.org", "mgohagon@aces.org", "bhutchins@aces.org"];

function escapeHtml(str: string): string {
  return String(str).replace(/[&<>"']/g, (c) => ({
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
    const clip = (v: unknown, n: number) => String(v ?? "").slice(0, n);
    const firstName = clip(body?.firstName, 100);
    const lastName = clip(body?.lastName, 100);
    const email = clip(body?.email, 255);
    const organization = clip(body?.organization, 200);
    const role = clip(body?.role, 100);
    const phone = clip(body?.phone, 40);
    const topic = clip(body?.topic, 200);
    const message = clip(body?.message, 4000);
    const formType = clip(body?.formType || "Website", 100);

    if (!email || !firstName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(apiKey);
    const fullName = `${firstName} ${lastName}`.trim();
    const row = (label: string, v: string) =>
      v ? `<p><strong>${label}:</strong> ${escapeHtml(v).replace(/\n/g, "<br>")}</p>` : "";

    const html = `
      <h2>New ${escapeHtml(formType)} submission</h2>
      ${row("Name", fullName)}
      ${row("Email", email)}
      ${row("Phone", phone)}
      ${row("Organization", organization)}
      ${row("Role", role)}
      ${row("Topic", topic)}
      ${row("Message", message)}
      <p><strong>Form:</strong> ${escapeHtml(formType)} (acespdsi.org)</p>
      <p style="color:#666;font-size:12px">All submissions are also saved in the admin portal under Submissions.</p>
    `;


    const { error } = await resend.emails.send({
      from: "ACES PDSI Leads <onboarding@resend.dev>",
      to: NOTIFY_TO,
      reply_to: email,
      subject: `New ${formType} submission: ${fullName}`,
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