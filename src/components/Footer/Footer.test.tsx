import React from 'react';
import { create } from 'react-test-renderer';
import Footer from './Footer';

const buildTime = new Date(2021, 0, 1, 8, 0, 0).toString();
const author = 'Sabertaz';
const socialList = {
  github: 'sabertazimi',
  twitter: 'sabertazimi',
  facebook: 'sabertazimi',
  linkedin: 'sabertazimi',
  weibo: 'sabertazimi',
};

describe('Footer', () => {
  test('should render correctly (snapshot)', () => {
    const tree = create(
      <Footer buildTime={buildTime} author={author} socialList={socialList} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
