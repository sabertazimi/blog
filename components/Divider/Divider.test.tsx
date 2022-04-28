import { render } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Divider>Divider</Divider>);

    expect(container).toMatchSnapshot();
  });
});
