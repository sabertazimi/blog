import { vi } from 'vitest'

export const Sandpack = vi.fn(({ files, template }: { files: Record<string, { code: string }>, template: string }) => (
  <div data-testid="sandpack-mock">
    <span>
      Template:
      {template}
    </span>
    {Object.entries(files).map(([path, { code }]) => (
      <div key={path} data-testid="sandpack-file">
        <span>
          File:
          {path}
        </span>
        <span>
          Code:
          {code}
        </span>
      </div>
    ))}
  </div>
))

export const githubLight = {}
export const sandpackDark = {}

vi.mock('@codesandbox/sandpack-react', () => ({
  Sandpack,
}))
