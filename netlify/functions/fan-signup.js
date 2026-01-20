import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req) => {
  if (req.method !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(req.body || "{}");

    // honeypot (bots fill this)
    if (data.company) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    const email = (data.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid email" }) };
    }

    const { data: signup, error: signupErr } = await supabase
      .from("fan_signups")
      .upsert(
        [{
          email,
          first_name: data.first_name || null,
          last_name: data.last_name || null,
          consent: !!data.consent,
          source: "website",
        }],
        { onConflict: "email" }
      )
      .select("id")
      .single();

    if (signupErr) throw signupErr;

    const { error: addrErr } = await supabase
      .from("fan_addresses")
      .upsert(
        [{
          signup_id: signup.id,
          address1: data.address1,
          address2: data.address2 || null,
          city: data.city,
          state: data.state || null,
          postal_code: data.postal_code,
          country: data.country || "US",
          phone: data.phone || null,
        }],
        { onConflict: "signup_id" }
      );

    if (addrErr) throw addrErr;

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
