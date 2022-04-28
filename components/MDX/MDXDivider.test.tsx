import { render } from '@testing-library/react';
import MDXDivider from './MDXDivider';

describe('MDXDivider', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<MDXDivider />);

    expect(container).toMatchSnapshot();
  });
});
