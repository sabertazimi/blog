import { render } from '@testing-library/react';
import Ease from './Ease';

describe('Ease', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <Ease>
        <div>Ease</div>
      </Ease>
    );

    expect(container).toMatchSnapshot();
  });
});
