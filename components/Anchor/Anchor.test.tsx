import { render } from '@testing-library/react';
import Anchor from './Anchor';

describe('Anchor', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Anchor />);

    expect(container).toMatchSnapshot();
  });
});
