import { render } from '@testing-library/react';
import Delete from './Delete';
import Emphasis from './Emphasis';
import Strong from './Strong';

describe('Texts', () => {
  const Texts = {
    strong: Strong,
    em: Emphasis,
    del: Delete,
  };

  test.each(Object.values(Texts))(
    'should render correctly (snapshot)',
    Text => {
      const { container } = render(<Text />);

      expect(container).toMatchSnapshot();
    }
  );
});
