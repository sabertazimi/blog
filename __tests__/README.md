# 测试指南

本文档是编写和维护项目测试的指导性文件，包含测试策略、最佳实践和注意事项。

## 技术栈

- **测试框架**: [Vitest](https://vitest.dev/)
- **测试工具**: [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- **断言库**: [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)
- **Mock 工具**: Vitest mocks
- **测试环境**: jsdom

## 测试策略

### 1. 测试范围

#### ✅ 需要测试的代码

- **业务组件** (`src/components/` 除 `ui/` 外)
  - 展示型组件：验证渲染逻辑、条件渲染、数据展示
  - 交互型组件：验证用户交互、状态变化、事件处理
  - 布局组件：验证结构、子组件渲染
- **工具函数** (`src/lib/`)
  - 纯函数：输入输出验证、边界情况
  - 业务逻辑：各种场景覆盖
- **国际化工具** (`src/i18n/`)
  - 语言切换、locale 处理

#### ❌ 不需要测试的代码

- **第三方 UI 组件** (`src/components/ui/`)
  - shadcn/ui 官方组件（button, dialog, dropdown-menu, tooltip 等）
  - 第三方动画组件（gravity-stars, morphing-text, flickering-grid, dot-pattern 等）
  - **理由**: 这些组件已有完善的测试，测试它们会增加维护成本
  - **例外**: 如果对这些组件做了重大修改或扩展，则应测试修改的部分
- **配置文件** (`*.config.ts`, `*.config.mts`)
- **类型定义** (`*.d.ts`)
- **样式文件** (`*.css`)

### 2. 测试优先级

按以下优先级编写测试：

1. **高优先级**：核心业务逻辑、用户关键路径
2. **中优先级**：常用工具函数、通用组件
3. **低优先级**：边缘场景、装饰性组件

### 3. 覆盖率目标

- **目标覆盖率**: 90%+（业务代码）
- **关注点**: 用户行为和业务逻辑，而非实现细节
- **测试类型**: 单元测试为主，集成测试为辅

## 测试环境配置

### Providers

测试环境已配置以下 Providers（在 `__tests__/test-utils.tsx` 中）：

1. **NextIntlClientProvider**: 国际化支持（默认 `en-US`）
2. **ThemeProvider**: 主题支持（light/dark）
3. **ProgressProvider**: 进度条支持

### 全局 Mocks

以下模块已在 `vitest.config.mts` 的 `setupFiles` 中全局 mock，无需在测试文件中手动导入：

1. **next/navigation**: `useRouter`, `usePathname`, `useParams`, `useSearchParams`
2. **@/i18n/navigation**: `Link`, `useRouter`, `usePathname`
3. **next/image**: Next.js Image 组件
4. **next-mdx-remote**: MDX 内容渲染
5. **@/components/mdx-editor**: MDX 编辑器组件
6. **@codesandbox/sandpack-react**: 代码编辑器

### 浏览器 API Mocks

以下浏览器 API 已在 `__tests__/setup.ts` 中 mock：

- `window.matchMedia`
- `IntersectionObserver`
- `ResizeObserver`
- `window.scrollTo`
- `HTMLElement.prototype.scrollIntoView`
- `HTMLCanvasElement.prototype.getContext`

## 编写测试的最佳实践

### 1. 文件组织

```bash
__tests__/
├── components/                 # 组件测试
│   └── component-name.test.tsx
├── lib/                        # 工具函数测试
│   └── utils.test.ts
├── i18n/                       # 国际化测试
│   └── utils.test.ts
├── mocks/                      # Mock 文件
│   ├── navigation.tsx
│   ├── next-image.tsx
│   └── ...
├── fixtures/                   # 测试数据
│   └── test-data.ts
├── test-utils.tsx              # 测试工具和自定义 render
├── setup.ts                    # 全局测试设置
└── README.md                   # 本文档
```

### 2. 导入规范

**✅ 正确的导入方式**：

```ts
import { describe, expect, it, vi } from 'vitest'
// 从 test-utils 导入所有测试工具
import { fireEvent, render, screen, waitFor } from '@/tests/test-utils'
```

**❌ 错误的导入方式**：

```ts
// 不要直接从 @testing-library/react 导入
import { render, screen } from '@testing-library/react'
```

### 3. 查询元素

#### 优先级顺序

1. **语义化查询**（最推荐）

   ```ts
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText('Email')
   screen.getByText('Welcome')
   ```

2. **`data-testid`**（语义化查询无法满足时）

   ```ts
   screen.getByTestId('custom-element')
   ```

3. **禁止使用 `container.querySelector`**
   - 如果必须查询特定元素，为组件添加 `data-testid`
   - 不要依赖 CSS 类名或元素层级

#### 查询示例

```tsx
// ✅ 推荐：使用语义化查询
const button = screen.getByRole('button', { name: /submit/i })
const heading = screen.getByRole('heading', { level: 1 })
const link = screen.getByRole('link', { name: /home/i })

// ✅ 可接受：使用 data-testid
const element = screen.getByTestId('custom-widget')

// ❌ 禁止：使用 container query
const { container } = render(<Component />)
const element = container.querySelector('.some-class')
```

### 4. 异步测试

```ts
// ✅ 使用 waitFor 处理异步更新
// ✅ 使用 userEvent 模拟真实用户交互
import userEvent from '@testing-library/user-event'

await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})

// ✅ 使用 findBy 查询异步元素
const element = await screen.findByText('Async content')
const user = userEvent.setup()
await user.click(button)
```

### 5. 测试描述

**✅ 清晰的测试描述**：

```ts
describe('LoginForm', () => {
  it('should display error message when email is invalid', () => {
    // ...
  })

  it('should submit form when all fields are valid', () => {
    // ...
  })
})
```

**❌ 模糊的测试描述**：

```ts
it('works', () => {}) // 太模糊
it('test email validation', () => {}) // 缺少预期结果
```

### 6. 测试数据

- **复用测试数据**: 将共享的 mock 数据放在 `__tests__/fixtures/test-data.ts`
- **简单数据内联**: 简单、特定于测试的数据可以直接在测试中定义
- **原则**: 如果数据在 2 个以上测试中使用，应提取到 fixtures

```ts
// ✅ 复用复杂的业务对象
import { mockPost, mockProfile } from '@/tests/fixtures/test-data'

// ✅ 简单数据内联
it('should format date', () => {
  const date = '2024-01-01'
  // ...
})
```

### 7. Mock 策略

#### 何时创建全局 Mock

如果一个模块在 **2 个以上测试文件**中需要 mock，应该：

1. 在 `__tests__/mocks/` 创建 mock 文件
2. 在 `vitest.config.mts` 的 `setupFiles` 中注册
3. 在需要的测试中使用 `vi.unmock()` 来取消 mock（如果测试组件本身）

#### 示例：创建全局 Mock

```ts
// __tests__/mocks/some-module.ts
import { vi } from 'vitest'

export const mockFunction = vi.fn()

vi.mock('some-module', () => ({
  someFunction: mockFunction,
}))
```

### 8. 组件测试模板

```tsx
import { describe, expect, it } from 'vitest'
import MyComponent from '@/components/my-component'
import { render, screen } from '@/tests/test-utils'

describe('MyComponent', () => {
  const defaultProps = {
    title: 'Test Title',
    onSubmit: vi.fn(),
  }

  it('should render component with props', () => {
    render(<MyComponent {...defaultProps} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    render(<MyComponent {...defaultProps} />)

    const button = screen.getByRole('button', { name: /submit/i })
    await userEvent.click(button)

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should display error state', () => {
    render(<MyComponent {...defaultProps} error="Error message" />)

    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
})
```

### 9. 工具函数测试模板

```ts
import { describe, expect, it } from 'vitest'
import { myUtilFunction } from '@/lib/utils'

describe('myUtilFunction', () => {
  it('should return expected result for valid input', () => {
    expect(myUtilFunction('input')).toBe('expected output')
  })

  it('should handle edge cases', () => {
    expect(myUtilFunction('')).toBe('')
    expect(myUtilFunction(null)).toBe(null)
  })

  it('should throw error for invalid input', () => {
    expect(() => myUtilFunction(undefined)).toThrow()
  })
})
```

## 注意事项

### 关键原则

1. **统一导入测试工具**: 所有测试工具必须从 `@/tests/test-utils` 导入
2. **语义化查询优先**: 使用 `getByRole`, `getByText`, `getByLabelText`
3. **避免测试实现细节**: 不测试 CSS 类名、内部状态、私有方法
4. **关注用户体验**: 测试用户可见的行为和输出
5. **Mock 最小化**: 只 mock 必要的外部依赖
6. **测试独立性**: 每个测试应该独立运行，不依赖其他测试
7. **路径别名**: 使用 `@/tests/` 别名导入测试工具，避免相对路径
8. **禁止使用 container query**:
   - 优先使用 `screen` 的语义化查询
   - 如果语义化查询无法满足需求，为组件添加 `data-testid`
   - **禁止**使用 `container.querySelector`
9. **全局 mocks**: 通用 mocks 已在 setupFiles 中配置，无需手动导入
10. **自注释代码**: 测试代码应具备自解释性
    - `it()` 描述应清晰表达测试意图和预期行为
    - 测试逻辑应简洁明了，避免需要注释解释
    - 仅在必要时添加注释（如解释复杂的异步行为或特殊边界情况）
    - 变量命名应语义化，如 `invalidDate` 而非 `date1`
11. **避免测试冗余**: 合并相似测试用例，使用 `rerender` 测试多种状态

### 常见陷阱

#### ❌ 测试实现细节

```ts
// 不要测试 CSS 类名
expect(element).toHaveClass('btn-primary')

// 不要测试内部状态
expect(component.state.count).toBe(1)
```

#### ✅ 测试用户行为

```ts
// 测试用户可见的内容
expect(screen.getByText('Submit')).toBeInTheDocument()

// 测试用户交互结果
await userEvent.click(button)
expect(screen.getByText('Success')).toBeInTheDocument()
```

#### ❌ 过度 Mock

```ts
// 不要 mock 简单的工具函数
vi.mock('@/lib/utils', () => ({
  formatDate: vi.fn(() => '2024-01-01'),
}))
```

#### ✅ 只 Mock 外部依赖

```ts
// 只 mock 外部 API 或复杂依赖
vi.mock('@/api/client', () => ({
  fetchData: vi.fn(() => Promise.resolve(mockData)),
}))
```

## 运行测试

```bash
# 运行测试（watch 模式）
pnpm test

# 运行所有测试并生成覆盖率报告
pnpm test:all

# 运行特定测试文件
pnpm test path/to/test.test.tsx
```

## 调试测试

### 1. 使用 `screen.debug()`

```tsx
it('should render', () => {
  render(<Component />)
  screen.debug() // 打印当前 DOM 结构
})
```

### 2. 使用 `logRoles`

```tsx
import { logRoles } from '@testing-library/react'

it('should render', () => {
  const { container } = render(<Component />)
  logRoles(container) // 打印所有可用的 roles
})
```

### 3. 查看查询建议

当查询失败时，Testing Library 会提供建议的查询方式，仔细阅读错误信息。

## 参考资源

### 官方文档

- [Testing Library 文档](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Library 查询优先级](https://testing-library.com/docs/queries/about#priority)
- [Vitest 文档](https://vitest.dev/)
- [Vitest API 参考](https://vitest.dev/api/)
- [Next.js Testing 文档](https://nextjs.org/docs/testing)

### 最佳实践

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

### 工具

- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) - 自定义断言
- [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) - 用户交互模拟
- [Vitest UI](https://vitest.dev/guide/ui.html) - 可视化测试界面

## 持续改进

测试是持续演进的过程：

1. **定期审查测试**: 删除过时或冗余的测试
2. **重构测试代码**: 提取重复逻辑，改善可读性
3. **更新测试策略**: 根据项目变化调整测试重点
4. **分享最佳实践**: 团队内部分享测试经验和技巧

---

**记住**: 好的测试应该像文档一样清晰，像用户一样思考，像代码一样简洁。
