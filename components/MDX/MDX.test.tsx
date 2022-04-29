import { render } from '@testing-library/react';
import Divider from './Divider';
import Input from './Input';

describe('Divider', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Divider />);

    expect(container).toMatchSnapshot();
  });
});

describe('Input', () => {
  test('should render input correctly (snapshot)', () => {
    const { container } = render(<Input />);

    expect(container).toMatchSnapshot();
  });

  test('should render checkbox correctly (snapshot)', () => {
    const { container } = render(<Input type="checkbox" />);

    expect(container).toMatchSnapshot();
  });
});
