import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    clearMocks: true,
    restoreMocks: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'src/data/vehicles.ts',
        'src/components/vehicles/VehicleCard.tsx',
        'src/context/FleetContext.tsx',
        'src/context/AuthContext.tsx',
        'src/context/CartContext.tsx',
        'src/pages/AdminPage.tsx',
        'src/pages/CheckoutPage.tsx',
        'src/pages/CheckoutResultPage.tsx',
      ],
      exclude: ['**/*.spec.*', '**/*.test.*'],
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: './coverage',
    },
  },
});
