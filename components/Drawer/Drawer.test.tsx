import { render } from '@testing-library/react';
import Drawer from './Drawer';

describe('Drawer', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <Drawer title="Drawer" visible={true} onClose={jest.fn()}>
        Drawer
      </Drawer>
    );

    expect(container).toMatchSnapshot();
  });
});
