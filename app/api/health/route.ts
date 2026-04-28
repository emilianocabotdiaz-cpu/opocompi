import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let supabaseHost = "";
  let supabaseUrlValid = false;

  if (supabaseUrl) {
    try {
      const parsedUrl = new URL(supabaseUrl);
      supabaseHost = parsedUrl.hostname;
      supabaseUrlValid = parsedUrl.protocol === "https:" && parsedUrl.hostname.includes("supabase");
    } catch {
      supabaseUrlValid = false;
    }
  }

  return NextResponse.json({
    siteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseUrlValid,
    supabaseHost,
    supabaseAnon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabaseService: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    stripeSecret: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeMonthly: Boolean(process.env.STRIPE_PRICE_MONTHLY),
    stripeYearly: Boolean(process.env.STRIPE_PRICE_YEARLY),
    stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    openai: Boolean(process.env.OPENAI_API_KEY),
  });
}
