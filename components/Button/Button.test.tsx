import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Button>Button</Button>);

    expect(container).toMatchSnapshot();
  });
});
