import React from 'react';
import { create } from 'react-test-renderer';
import Close from './Close';
import Comment from './Comment';
import Hamburger from './Hamburger';

describe('Icons', () => {
  test('should render [Close] icon correctly (snapshot)', () => {
    const tree = create(<Close />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render [Comment] icon correctly (snapshot)', () => {
    const tree = create(<Comment />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render [Hamburger] icon correctly (snapshot)', () => {
    const tree = create(<Hamburger />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
