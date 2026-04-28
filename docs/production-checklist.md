# Checklist de produccion

## 1. Vercel

- Framework Preset: `Next.js`.
- Build Command: `next build`.
- Output Directory: vacio.
- Install Command: `npm install`.
- Variables de entorno cargadas desde `.env.example`.
- Visita `/setup` tras cada cambio de variables.

## 2. Supabase

- Crear proyecto.
- Ejecutar `docs/supabase-schema.sql` en SQL Editor.
- Activar login por email.
- Revisar que `profiles` existe.
- Guardar en Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## 3. Stripe

- Crear producto mensual de 9,90 EUR.
- Crear producto anual de 90,90 EUR.
- Copiar ambos price IDs en Vercel.
- Crear webhook:

```text
https://tu-dominio.vercel.app/api/stripe-webhook
```

- Eventos:

```text
checkout.session.completed
customer.subscription.updated
customer.subscription.deleted
```

- Copiar `STRIPE_WEBHOOK_SECRET` en Vercel.

## 4. OpenAI

- Crear API key.
- Guardar `OPENAI_API_KEY` en Vercel.
- Mantener `OPENAI_MODEL=gpt-5.4-mini` para empezar.

## 5. Prueba completa

- Crear usuario con email.
- Abrir enlace magico.
- Contratar plan con tarjeta de prueba de Stripe.
- Volver a la web.
- Confirmar que el chat queda desbloqueado.
- Enviar una pregunta real al asistente.
