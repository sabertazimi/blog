import { render } from '@utils';
import Anchor from './Anchor';
import Delete from './Delete';
import Emphasis from './Emphasis';
import Strong from './Strong';

describe('Texts', () => {
  const Texts = {
    a: Anchor,
    strong: Strong,
    em: Emphasis,
    del: Delete,
  };

  test.each(Object.values(Texts))(
    'should render correctly (snapshot)',
    Text => {
      const { container } = render(<Text>Text</Text>);

      expect(container).toMatchSnapshot();
    }
  );
});
