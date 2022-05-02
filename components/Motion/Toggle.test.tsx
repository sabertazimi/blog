import { render } from '@testing-library/react';
import Toggle from './Toggle';

describe('Toggle', () => {
  const cases = [
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ];

  test.each(cases)(
    'should render animation correctly (snapshot)',
    (isToggled, shouldReduceMotion) => {
      const { container } = render(
        <Toggle
          isToggled={isToggled}
          onToggle={jest.fn()}
          iconClose={<div>Close</div>}
          iconOpen={<div>Open</div>}
          shouldReduceMotion={shouldReduceMotion}
        />
      );

      expect(container).toMatchSnapshot();
    }
  );
});
