import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
    setupFiles: [
      '__tests__/setup.ts',
      '__tests__/mocks/next-navigation.ts',
      '__tests__/mocks/navigation.tsx',
      '__tests__/mocks/next-image.tsx',
    ],
  },
})
