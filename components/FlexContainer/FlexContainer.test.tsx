import { render, screen } from '@utils';
import { axe } from 'jest-axe';
import FlexContainer from './FlexContainer';

describe('FlexContainer', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render children correctly', () => {
    render(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>
    );

    expect(screen.getByRole('main')).toContainElement(
      screen.getByText('FlexContainer')
    );
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <FlexContainer role="main">
        <h1>FlexContainer</h1>
      </FlexContainer>
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });
});
