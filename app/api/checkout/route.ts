import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe no esta configurado todavia." }, { status: 501 });
  }

  const { plan, email } = (await request.json()) as {
    plan?: "monthly" | "yearly";
    email?: string;
  };

  if (!email?.trim()) {
    return NextResponse.json({ error: "Introduce un email para contratar la membresia." }, { status: 400 });
  }

  const price =
    plan === "yearly" ? process.env.STRIPE_PRICE_YEARLY : process.env.STRIPE_PRICE_MONTHLY;

  if (!price) {
    return NextResponse.json({ error: "Falta el precio de Stripe para este plan." }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email.trim(),
    line_items: [{ price, quantity: 1 }],
    success_url: `${siteUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/?checkout=cancelled`,
    metadata: {
      email: email.trim(),
      plan: plan ?? "monthly",
    },
  });

  return NextResponse.json({ url: session.url });
}
