import type { Parent, Root } from 'mdast'
import type { Node } from 'unist'
import { visit } from 'unist-util-visit'

/**
 * Markdown abstract syntax tree node definition.
 * @see https://github.com/syntax-tree/mdast
 */
interface ContainerDirective extends Parent {
  name: string
  attributes: Record<string, string>
  value?: string
}

const isContainerDirective = (node: Node): node is ContainerDirective =>
  node.type === 'containerDirective'

export default function remarkAdmonitions() {
  return (tree: Root) => {
    visit(tree, node => {
      if (isContainerDirective(node)) {
        // Change container html element to `<aside type="*" title="*" class="admonition admonition-*">`,
        node.data = {
          hName: 'aside',
          hProperties: {
            type: node.name,
            title: Object.keys(node.attributes).join(' '),
            className: `admonition admonition-${node.name}`,
          },
        }
      }
    })
  }
}
