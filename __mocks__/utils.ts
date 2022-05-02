let navigatorClipboardMocked = false;
const writeTextMock = jest.fn();

const mockNavigatorClipboard = () => {
  if (!navigatorClipboardMocked) {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
    });

    navigatorClipboardMocked = true;
  }

  return { writeTextMock };
};

export { mockNavigatorClipboard };
