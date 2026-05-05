import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const { email, redirectTo } = (await request.json()) as { email?: string; redirectTo?: string };

  if (!email?.trim()) {
    return NextResponse.json({ error: "Introduce un email valido." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase no esta configurado en Vercel." }, { status: 501 });
  }

  const siteUrl = redirectTo?.startsWith(request.nextUrl.origin)
    ? redirectTo
    : process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error } = await Promise.race([
    supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: siteUrl,
      },
    }),
    new Promise<{ error: { message: string } }>((resolve) => {
      setTimeout(() => resolve({ error: { message: "Supabase no respondio a tiempo." } }), 10000);
    }),
  ]);

  if (error) {
    const status = error.message.includes("tiempo") ? 504 : 400;
    return NextResponse.json({ error: `Supabase: ${error.message}` }, { status });
  }

  return NextResponse.json({
    message: "Te hemos enviado un enlace de acceso al email. Revisa tambien spam o promociones.",
  });
}
