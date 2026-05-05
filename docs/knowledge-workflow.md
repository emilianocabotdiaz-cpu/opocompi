# Como alimentar la IA de OpoCompi

## Flujo recomendado

1. Elegir un bloque pequeno del temario.
2. Crear un documento en `docs/knowledge/`.
3. Incluir:
   - fuente,
   - fecha de revision,
   - resumen de estudio,
   - dudas frecuentes,
   - preguntas tipo test,
   - respuestas correctas,
   - explicacion de fallos.
4. Pasar un resumen corto a `lib/opocompi-brain.ts`.
5. Probar el chat con preguntas reales.
6. Ajustar instrucciones y contenido.

## Por que no meter todo de golpe

Meter mucho temario sin validar puede empeorar la IA. Es mejor empezar con bloques pequenos, revisarlos y comprobar que las respuestas son utiles.

## Primer bloque creado

```text
docs/knowledge/constitucion-espanola.md
```

Incluye:

- estructura general de la Constitucion,
- Titulo Preliminar,
- mapa del Titulo I,
- dudas frecuentes,
- cinco preguntas tipo test iniciales.

## Segundo bloque creado

```text
docs/knowledge/seguridad-privada.md
```

Creado a partir de:

- Temario aportado por el usuario como orientacion de estructura.
- Ley 5/2014, de 4 de abril, de Seguridad Privada, consultada como referencia normativa principal.

Regla importante:

- No copiar literalmente temarios privados.
- Convertir cada tema en apuntes propios, esquemas y preguntas.
- Contrastar articulos y datos normativos con BOE o fuente oficial.

## Siguiente bloque sugerido

Derecho Penal:

- dolo directo,
- dolo eventual,
- imprudencia,
- tentativa,
- eximentes,
- agravantes,
- penas.
