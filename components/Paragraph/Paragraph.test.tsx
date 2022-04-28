import { render } from '@testing-library/react';
import Paragraph from './Paragraph';

describe('Paragraph', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Paragraph />);

    expect(container).toMatchSnapshot();
  });
});
