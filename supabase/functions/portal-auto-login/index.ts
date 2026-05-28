import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SHARED_ADMIN_EMAIL = "bobwhutchins@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: SHARED_ADMIN_EMAIL,
    });

    if (error) throw error;

    const hashed_token =
      (data as any)?.properties?.hashed_token ??
      (data as any)?.hashed_token ??
      null;

    if (!hashed_token) {
      throw new Error("Failed to generate login token");
    }

    return new Response(
      JSON.stringify({ token_hash: hashed_token, email: SHARED_ADMIN_EMAIL }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});