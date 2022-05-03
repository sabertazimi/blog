import { render } from '@testing-library/react';
import LiveCode from './LiveCode';

describe('LiveCode', () => {
  test('should render live code correctly (snapshot)', () => {
    const { container } = render(
      <LiveCode className="language-type" code="Live Code" />
    );

    expect(container).toMatchSnapshot();
  });
});
