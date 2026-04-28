# OpoCompi

App web para un asistente guiado por IA que acompana a opositores a Policia Nacional.

## Estado actual

Esta version ya esta preparada como app Next.js para Vercel:

- Landing publica.
- Login por email con Supabase Auth.
- Estado de membresia desde Supabase.
- Stripe Checkout para plan mensual y anual.
- Webhook de Stripe para activar o desactivar la membresia.
- Chat server-side conectado a OpenAI cuando se configure `OPENAI_API_KEY`.
- Generador inicial de tests.

Si faltan claves de Supabase, Stripe u OpenAI, la app muestra modo demo o mensajes de configuracion.

## Archivos principales

- `app/page.tsx`: interfaz principal.
- `app/globals.css`: estilos.
- `app/api/chat/route.ts`: endpoint del asistente IA.
- `app/api/checkout/route.ts`: endpoint para Stripe Checkout.
- `app/api/stripe-webhook/route.ts`: webhook de Stripe.
- `app/api/me/route.ts`: comprueba usuario y membresia.
- `lib/supabase-browser.ts`: cliente publico de Supabase.
- `lib/supabase-admin.ts`: cliente admin de Supabase para servidor.
- `docs/supabase-schema.sql`: tablas y trigger iniciales de Supabase.
- `docs/production-checklist.md`: orden recomendado para configurar produccion.
- `.env.example`: variables necesarias.

## Variables de entorno en Vercel

Configura estas variables en Vercel, dentro de Project Settings -> Environment Variables:

```text
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini

STRIPE_SECRET_KEY=
STRIPE_PRICE_MONTHLY=
STRIPE_PRICE_YEARLY=
STRIPE_WEBHOOK_SECRET=
```

## Supabase

1. Crea un proyecto en Supabase.
2. En SQL Editor, ejecuta el contenido de `docs/supabase-schema.sql`.
3. Copia `Project URL` a `NEXT_PUBLIC_SUPABASE_URL`.
4. Copia `anon public` a `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Copia `service_role` a `SUPABASE_SERVICE_ROLE_KEY`.
6. En Authentication, activa login por email.

## Stripe

1. Crea dos productos/precios:
   - Mensual: 19 EUR / mes.
   - Anual: 149 EUR / ano.
2. Copia los price IDs:
   - `STRIPE_PRICE_MONTHLY`
   - `STRIPE_PRICE_YEARLY`
3. Copia la secret key a `STRIPE_SECRET_KEY`.
4. Crea un webhook hacia:

```text
https://tu-dominio.vercel.app/api/stripe-webhook
```

5. Eventos recomendados:

```text
checkout.session.completed
customer.subscription.updated
customer.subscription.deleted
```

6. Copia el signing secret a `STRIPE_WEBHOOK_SECRET`.

## OpenAI

1. Crea una API key.
2. Pegala en Vercel como `OPENAI_API_KEY`.
3. Deja `OPENAI_MODEL=gpt-5.4-mini` para empezar con buena relacion coste/latencia.

## Despliegue

Sube todos los archivos del proyecto a GitHub y deja que Vercel redepliegue. Al detectar `package.json`, Vercel lo tratara como app Next.js.

Tras desplegar, visita:

```text
https://tu-dominio.vercel.app/setup
```

Esa pagina indica que bloques de configuracion siguen pendientes sin mostrar ninguna clave.

## Siguiente fase

- Guardar conversaciones.
- Generar tests con IA y respuestas correctas estructuradas.
- Crear banco de preguntas validado.
- Anadir panel de administracion para temario y preguntas.
- Crear pagina de cuenta para gestionar suscripcion.
