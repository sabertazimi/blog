import { render } from '@testing-library/react';
import Toggle from './Toggle';

describe('Toggle', () => {
  test('should render reduced close animation correctly (snapshot)', () => {
    const { container } = render(
      <Toggle
        isToggled={false}
        onToggle={jest.fn()}
        iconClose={<div>Close</div>}
        iconOpen={<div>Open</div>}
        shouldReduceMotion={true}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render reduced open animation correctly (snapshot)', () => {
    const { container } = render(
      <Toggle
        isToggled={true}
        onToggle={jest.fn()}
        iconClose={<div>Close</div>}
        iconOpen={<div>Open</div>}
        shouldReduceMotion={true}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
