# BGS Car React

Aplicación de arriendo de vehículos reconstruida como SPA con React, TypeScript, React Router y Bootstrap. Mantiene las áreas y el flujo del proyecto BGS Car original, con componentes, estado y rutas propios de React.

## Ejecutar en local

```bash
pnpm install
pnpm run dev
```

## Secciones

| Ruta | Página |
| --- | --- |
| `/` | Inicio, buscador por fechas y autos destacados |
| `/flota` | Catálogo con filtros por categoría y transmisión |
| `/carrito` | Resumen de reserva, días y total |
| `/categorias` | Categorías disponibles y cantidad de vehículos |
| `/categorias/:categoria` | Vehículos filtrados por categoría |
| `/vehiculos/:id` | Ficha detallada de un vehículo |
| `/ofertas` | Tarifas promocionales de vehículos seleccionados |
| `/checkout` | Datos del cliente, retiro o entrega y pago de demostración |
| `/checkout/resultado/:resultado` | Comprobante de pago aprobado o rechazado |
| `/login` | Acceso de cliente y administrador de demostración |
| `/admin` | Administración local de la flota |
| `/servicios` | Servicios BGS Car |
| `/sucursales` | Puntos de retiro |
| `/contacto` | Formulario de contacto local |

## Organización

```text
src/
  components/
    layout/       Navegación y pie de página compartidos
    vehicles/     Tarjetas reutilizables de vehículos
  context/        Estado global de autenticación, flota y reserva
  data/           Catálogo inicial
  hooks/          Acceso tipado a los contextos
  pages/          Vistas asociadas a las rutas
  styles/         Tema y estilos propios
  types/          Tipos compartidos de TypeScript
  utils/          Formato de precios y cálculo de días
public/assets/img/ Imágenes y logo BGS Car
```

La flota, el usuario de demostración y la reserva se guardan en `localStorage`; no hay backend conectado. Las ofertas conservan la tarifa rebajada al pasar al carrito y al checkout.

## Pruebas unitarias y cobertura

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm test:coverage
```

La suite ejecuta 49 casos en Vitest con jsdom y React Testing Library. Incluye pruebas de lógica, contextos y componentes, además de mocks/spies. El reporte instrumental mide ocho archivos seleccionados; consulta [docs/COBERTURA_TESTING.md](docs/COBERTURA_TESTING.md) para sus métricas y límites.


Para entrar al panel de administración en esta demo, usa el correo `admin@duoc.cl` en la página de acceso.
