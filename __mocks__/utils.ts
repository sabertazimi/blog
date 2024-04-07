let navigatorClipboardMocked = false
const writeTextMock = vi.fn()

function mockNavigatorClipboard() {
  if (!navigatorClipboardMocked) {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
    })

    navigatorClipboardMocked = true
  }

  return { writeTextMock }
}

export { mockNavigatorClipboard }
