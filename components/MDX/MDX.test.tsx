import { render } from '@testing-library/react';
import MDXCode from './MDXCode';
import MDXDivider from './MDXDivider';
import MDXInput from './MDXInput';
import MDXPre from './MDXPre';

describe('MDXDivider', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<MDXDivider />);

    expect(container).toMatchSnapshot();
  });
});

describe('MDXInput', () => {
  test('should render input correctly (snapshot)', () => {
    const { container } = render(<MDXInput />);

    expect(container).toMatchSnapshot();
  });

  test('should render checkbox correctly (snapshot)', () => {
    const { container } = render(<MDXInput type="checkbox" />);

    expect(container).toMatchSnapshot();
  });
});

describe('MDXPre', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<MDXPre />);

    expect(container).toMatchSnapshot();
  });
});

describe('MDXCode', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<MDXCode />);

    expect(container).toMatchSnapshot();
  });
});
