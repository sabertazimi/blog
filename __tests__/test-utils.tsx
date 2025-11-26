import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Providers } from '@/app/providers'

function AllTheProviders({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
