import Blockquote from '@components/Blockquote';
import Button from '@components/Button';
import { Code, InlineCode } from '@components/CodeBlocks';
import { H1, H2, H3, H4, H5, H6 } from '@components/Headings';
import ImageCard from '@components/ImageCard';
import { Item, Ol, Ul } from '@components/Lists';
import Paragraph from '@components/Paragraph';
import { Anchor, Delete, Emphasis, Strong } from '@components/Texts';
import MDXDivider from './MDXDivider';

const Headings = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};

const Texts = {
  a: Anchor,
  strong: Strong,
  em: Emphasis,
  del: Delete,
};

const Lists = {
  ul: Ul,
  ol: Ol,
  li: Item,
};

const CodeBlocks = {
  code: InlineCode,
  pre: Code,
};

const MDX = {
  p: Paragraph,
  hr: MDXDivider,
  img: ImageCard,
  blockquote: Blockquote,
  ...Headings,
  ...Texts,
  ...Lists,
  ...CodeBlocks,
  Button,
};

export default MDX;
