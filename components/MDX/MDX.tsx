import Anchor from '@components/Anchor';
import Button from '@components/Button';
import { H1, H2, H3, H4, H5, H6 } from '@components/Headings';
import Paragraph from '@components/Paragraph';
import { Delete, Emphasis, Strong } from '@components/Texts';
import MDXDivider from './MDXDivider';
import MDXImage from './MDXImage';

const Headings = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};

const Texts = {
  strong: Strong,
  em: Emphasis,
  del: Delete,
};

const MDX = {
  a: Anchor,
  p: Paragraph,
  hr: MDXDivider,
  img: MDXImage,
  ...Headings,
  ...Texts,
  Button,
};

export default MDX;
