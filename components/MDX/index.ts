import Anchor from './Anchor';
import Headings from './Headings';
import Paragraph from './Paragraph';
import Texts from './Texts';

const MDXComponents = {
  a: Anchor,
  p: Paragraph,
  ...Headings,
  ...Texts,
};

export default MDXComponents;
