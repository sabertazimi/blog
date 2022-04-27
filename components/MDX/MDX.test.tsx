import { render } from '@testing-library/react';
import Anchor from './Anchor';
import Headings from './Headings';
import Paragraph from './Paragraph';
import Texts from './Texts';

describe('Anchor', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Anchor />);

    expect(container).toMatchSnapshot();
  });
});

describe('Paragraph', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Paragraph />);

    expect(container).toMatchSnapshot();
  });
});

describe('Headings', () => {
  test.each(Object.values(Headings))(
    'should render correctly (snapshot)',
    Heading => {
      const { container } = render(<Heading />);

      expect(container).toMatchSnapshot();
    }
  );
});

describe('Texts', () => {
  test.each(Object.values(Texts))(
    'should render correctly (snapshot)',
    Text => {
      const { container } = render(<Text />);

      expect(container).toMatchSnapshot();
    }
  );
});
