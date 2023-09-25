import { render } from '@utils';
import { axe } from 'jest-axe';
import MetaHeader from './MetaHeader';

describe('MetaHeader', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<MetaHeader />);

    expect(container).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<MetaHeader />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
