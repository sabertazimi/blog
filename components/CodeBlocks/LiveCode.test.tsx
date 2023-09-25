import { render } from '@utils';
import LiveCode from './LiveCode';

describe('LiveCode', () => {
  test('should render live code correctly (snapshot)', () => {
    const { container } = render(
      <LiveCode language="typescript">const foo = bar();</LiveCode>
    );

    expect(container).toMatchSnapshot();
  });
});
