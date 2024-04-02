import Aside from '@components/Aside'
import Blockquote from '@components/Blockquote'
import Button from '@components/Button'
import Footnote from '@components/Footnote'
import { H1, H2, H3, H4, H5, H6 } from '@components/Headings'
import ImageCard from '@components/ImageCard'
import { Item, Ol, Ul } from '@components/Lists'
import Paragraph from '@components/Paragraph'
import Table from '@components/Table'
import { Anchor, Delete, Emphasis, Strong } from '@components/Texts'
import { dynamic } from '@components/utils'
import Code from './MDXCode'
import Divider from './MDXDivider'
import Input from './MDXInput'
import Pre from './MDXPre'

// eslint-disable-next-line ts/no-unsafe-assignment -- dynamic import.
const Editor = dynamic(() => import('@components/Editor')) as any

const Headings = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
}

const Texts = {
  a: Anchor,
  strong: Strong,
  em: Emphasis,
  del: Delete,
}

const Lists = {
  ul: Ul,
  ol: Ol,
  li: Item,
}

const CodeBlocks = {
  code: Code,
  pre: Pre,
}

const customComponents = {
  Button,
  // eslint-disable-next-line ts/no-unsafe-assignment -- dynamic import.
  Editor,
}

const MDX = {
  p: Paragraph,
  hr: Divider,
  img: ImageCard,
  blockquote: Blockquote,
  table: Table,
  input: Input,
  aside: Aside,
  section: Footnote,
  ...Headings,
  ...Texts,
  ...Lists,
  ...CodeBlocks,
  ...customComponents,
}

export default MDX
