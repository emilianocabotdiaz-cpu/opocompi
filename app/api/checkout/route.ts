import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe no esta configurado todavia." }, { status: 501 });
  }

  const supabase = getSupabaseAdmin();
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const { plan } = (await request.json()) as { plan?: "monthly" | "yearly" };

  const price =
    plan === "yearly" ? process.env.STRIPE_PRICE_YEARLY : process.env.STRIPE_PRICE_MONTHLY;

  if (!price) {
    return NextResponse.json({ error: "Falta el precio de Stripe para este plan." }, { status: 400 });
  }

  if (!supabase || !token) {
    return NextResponse.json({ error: "Inicia sesion para contratar la membresia." }, { status: 401 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user?.email) {
    return NextResponse.json({ error: "No se pudo validar el usuario." }, { status: 401 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price, quantity: 1 }],
    success_url: `${siteUrl}/?checkout=success`,
    cancel_url: `${siteUrl}/?checkout=cancelled`,
    metadata: {
      user_id: user.id,
      plan: plan ?? "monthly",
    },
  });

  return NextResponse.json({ url: session.url });
}
