import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { create } from 'react-test-renderer';
import Close from './Close';
import Comment from './Comment';
import Hamburger from './Hamburger';

describe('Icons', () => {
  const Icons = [Close, Comment, Hamburger];

  test.each(Icons)('should render %# icon correctly (snapshot)', Icon => {
    const tree = create(<Icon />).toJSON();

    expect(tree).toMatchSnapshot();
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
