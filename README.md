# OpoCompi

Primera version web de un asistente guiado por IA para opositores a Policia Nacional.

## Que incluye

- Pagina principal con propuesta de valor.
- Area privada con bloqueo por membresia en modo demo.
- Chat simulado con modos de ayuda: dudas, tests, animo y plan semanal.
- Generador rapido de tests por bloque.
- Seccion de planes de membresia.
- Configuracion minima para publicar en Vercel.

## Como abrirlo en local

Abre `index.html` directamente en el navegador.

## Como subirlo a GitHub

1. Crea un repositorio nuevo en GitHub, por ejemplo `opocompi`.
2. Sube estos archivos al repositorio:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `.gitignore`
   - `vercel.json`
3. Comprueba que el repositorio queda publico o privado segun prefieras.

## Como publicarlo en Vercel

1. Entra en Vercel.
2. Pulsa `Add New...` y despues `Project`.
3. Importa el repositorio de GitHub.
4. En framework selecciona `Other` si Vercel no lo detecta automaticamente.
5. Deja vacio el comando de build.
6. Deja la carpeta de salida como raiz del proyecto.
7. Pulsa `Deploy`.

## Ruta para pasarlo a producto real

Fase 1: Demo publica

- Publicar esta version en Vercel.
- Validar nombre, mensaje, precios y experiencia con usuarios reales.

Fase 2: Membresia real

- Pasar el proyecto a Next.js.
- Anadir registro e inicio de sesion con Supabase, Clerk o Auth0.
- Conectar Stripe para pagos mensuales y anuales.
- Bloquear el area privada cuando la suscripcion no este activa.

Fase 3: IA real

- Crear un backend que llame a la API de IA.
- Definir instrucciones del asistente: resolver dudas, generar tests, explicar fallos y acompanar emocionalmente.
- Guardar conversaciones y resultados de tests.
- Crear una base de conocimiento revisada por preparadores.

Fase 4: Producto avanzado

- Panel de administracion.
- Banco de preguntas validado.
- Estadisticas de progreso.
- Temas fuertes y debiles.
- Simulacros cronometrados.
- Recordatorios y plan semanal.

## Nota importante

La demo no debe usarse como fuente oficial de temario. Las respuestas y preguntas deben revisarse por preparadores o por fuentes oficiales antes de ponerse en produccion.
