import React from 'react';
import { create } from 'react-test-renderer';
import TypingTitle from './TypingTitle';

const landingTitles = [`I'm a coder.`, `I'm a learner.`];

describe('TypingTitle', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(<TypingTitle titles={landingTitles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
