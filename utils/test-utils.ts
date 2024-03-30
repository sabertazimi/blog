import { render as testingRender } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { createElement } from 'react'

export * from '@testing-library/react'

export function render(ui: Parameters<typeof testingRender>[0], options?: Parameters<typeof testingRender>[1]): ReturnType<typeof testingRender> {
  return testingRender(
    createElement(
      ConfigProvider,
      {
        theme: {
          hashed: false,
        },
      },
      ui,
    ),
    options,
  )
}
