# Guía para la presentación individual

**BGS Car · DSY1104 · Evaluación Parcial 2**  
Propuesta para 15 minutos y ronda de preguntas.

## Guion

| Minutos | Demostración |
|---|---|
| 0–2 | Problema, alcance frontend y diferencias entre simulación local y servicios reales. |
| 2–5 | Estructura React, rutas, componentes, props y Context. |
| 5–8 | Categorías/ofertas, carrito, duración, checkout y resultados aprobado/rechazado. |
| 8–10 | Cambiar viewport entre móvil y escritorio y explicar la grilla Bootstrap. |
| 10–12 | Panel admin, validaciones, CRUD y persistencia local. |
| 12–15 | Ejecutar `pnpm test:coverage`; explicar 49/49 y mostrar las cuatro métricas del reporte. |

## Conceptos clave

- **React:** cada ruta presenta una vista y los componentes reutilizables reciben datos y callbacks por props.
- **Estado:** carrito, sesión y flota se comparten mediante Context y hooks; los formularios mantienen estado local.
- **Persistencia:** `localStorage` guarda datos de demostración en el mismo navegador; no reemplaza backend ni autenticación real.
- **Responsive:** mostrar efectivamente el cambio de viewport y las clases Bootstrap utilizadas.
- **Testing:** Vitest ejecuta 49 casos en jsdom con React Testing Library. Los mocks aíslan almacenamiento, confirmación, impresión, reloj y callbacks.
- **Cobertura:** en los ocho archivos instrumentados se midieron statements 95,40%, branches 96,52%, functions 92,10% y lines 95,15%. La cifra no abarca toda la aplicación.
- **Aclaración de pauta:** el criterio menciona Jasmine/Karma. La suite entregada usa Vitest; alcanza pruebas DOM, mocks y cobertura, pero no satisface literalmente esos nombres si se exigen como herramienta obligatoria.

## Preguntas probables

| Pregunta | Respuesta sugerida |
|---|---|
| ¿Por qué Context? | Flota, sesión y carrito se consumen en varias rutas y Context evita pasar props por cada nivel. |
| ¿Qué demuestra la cobertura? | La proporción de código ejecutado en los ocho archivos configurados, según statements, ramas, funciones y líneas. |
| ¿49/49 equivale a 100% de cobertura? | No. Es la proporción de pruebas aprobadas; la cobertura de código se reporta por separado. |
| ¿Qué limitación de herramientas queda? | La pauta nombra Jasmine/Karma; el proyecto usa Vitest. Hay que confirmar si aceptan esta alternativa o portar la suite. |
| ¿Se procesa un pago real? | No, se simulan los estados aprobado y rechazado. |
