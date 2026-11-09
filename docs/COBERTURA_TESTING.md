# Informe de pruebas y cobertura

**Proyecto:** BGS Car React  
**Asignatura:** DSY1104 Desarrollo Fullstack II  
**Evaluación:** Parcial 2

## Resultado

La suite Vitest ejecutó **49 pruebas en 8 archivos: 49 aprobadas y 0 fallidas**. TypeScript y el build de producción también finalizaron correctamente.

| Métrica | Resultado | Alcance |
|---|---:|---|
| Statements | 95,40% (187/196) | 8 archivos incluidos |
| Branches | 96,52% (111/115) | 8 archivos incluidos |
| Functions | 92,10% (70/76) | 8 archivos incluidos |
| Lines | 95,15% (157/165) | 8 archivos incluidos |

La cobertura es instrumental y se limita a `vehicles.ts`, `VehicleCard.tsx`, los contextos de flota/autenticación/carrito y las páginas Admin, Checkout y CheckoutResult. No representa toda la aplicación.

## Ejecutar

Se recomienda pnpm, cuyo lockfile está incluido:

```bash
pnpm install
pnpm test
pnpm test:coverage
pnpm build
```

Vitest corre en jsdom con React Testing Library. Los mocks y spies cubren callbacks, almacenamiento, confirmación del navegador, impresión y reloj. El detalle de métricas se genera en `coverage/`.

## Pruebas incluidas

| Archivo | Casos | Enfoque |
|---|---:|---|
| `vehicle-data.spec.ts` | 14 | Lectura, persistencia, validación, CRUD, inmutabilidad y datos |
| `VehicleCard.spec.tsx` | 5 | Renderizado y acciones de tarjeta |
| `FleetContext.spec.tsx` | 5 | Estado y operaciones de flota |
| `CartContext.spec.tsx` | 8 | Carrito, cantidades, totales y persistencia |
| `AuthContext.spec.tsx` | 3 | Sesión y acceso de demostración |
| `Checkout.spec.tsx` | 6 | Formulario, validación y confirmación de compra |
| `AdminPage.spec.tsx` | 6 | Administración y acciones CRUD |
| `CheckoutResult.spec.tsx` | 2 | Resultados aprobado/rechazado e impresión |

## Estado frente a la pauta

La pauta nombra Jasmine y Karma. Esta entrega implementa y ejecuta las pruebas con **Vitest**, Testing Library y jsdom, con mocks y cobertura real. Se cubren los objetivos funcionales de pruebas, DOM, dobles de prueba y medición de cobertura, pero **no se cumple literalmente el requisito de usar Jasmine/Karma**. Si la evaluación exige esos nombres de herramientas, queda pendiente portar la suite o solicitar aceptación de Vitest como alternativa equivalente. No debe afirmarse cumplimiento literal de esos dos nombres.

## Lectura de resultados y límites

Los 49 casos comprueban tanto lógica como interacciones de componentes seleccionados. Los porcentajes describen únicamente los ocho archivos instrumentados. No son una medida de calidad total ni cubren todas las rutas visuales, tamaños de pantalla o integraciones con servicios reales. Pagos, autenticación y persistencia siguen siendo demostraciones locales sin backend.
