let navigatorClipboardMocked = false
const writeTextMock = jest.fn()

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
