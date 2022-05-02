import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Comment from './Comment';
import Hamburger from './Hamburger';

describe('Icons', () => {
  const Icons = [Comment, Hamburger];

  test.each(Icons)('should render %# icon correctly (snapshot)', Icon => {
    const { container } = render(<Icon />);

    expect(container).toMatchSnapshot();
  });

  test.each(Icons)(
    'should render %# icon accessibility guidelines (AXE)',
    async Icon => {
      const { container } = render(<Icon />);

      const a11y = await axe(container);

      expect(a11y).toHaveNoViolations();
    }
  );
});
