import { render } from '@testing-library/react';
import Item from './Item';
import Ol from './Ol';
import Ul from './Ul';

describe('Lists', () => {
  const Lists = {
    ul: Ul,
    ol: Ol,
    li: Item,
  };

  test.each(Object.values(Lists))(
    'should render correctly (snapshot)',
    List => {
      const { container } = render(<List />);

      expect(container).toMatchSnapshot();
    }
  );
});
