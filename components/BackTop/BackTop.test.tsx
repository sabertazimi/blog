import { render } from '@testing-library/react';
import BackTop from './BackTop';

describe('BackTop', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<BackTop />);

    expect(container).toMatchSnapshot();
  });
});
