import { render } from '@utils';
import Blockquote from './Blockquote';

describe('Blockquote', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Blockquote>Blockquote</Blockquote>);

    expect(container).toMatchSnapshot();
  });
});
