import type { Parent, Root } from 'mdast'
import type { Node } from 'unist'
import { visit } from 'unist-util-visit'

/**
 * Markdown abstract syntax tree node definition.
 * @see https://github.com/syntax-tree/mdast
 */
interface ContainerDirective extends Parent {
  type: 'containerDirective'
  name: string
  attributes?: Record<string, string>
  children: Parent['children']
}

function isContainerDirective(node: Node): node is ContainerDirective {
  return node.type === 'containerDirective'
}

/**
 * Extract text content from a node recursively
 */
function extractTextContent(node: Parent): string {
  let text = ''
  for (const child of node.children) {
    if (child.type === 'text') {
      text += child.value
    } else if ('children' in child) {
      text += extractTextContent(child as Parent)
    }
  }
  return text
}

export default function remarkAdmonitions() {
  return (tree: Root) => {
    visit(tree, (node: Node) => {
      if (!isContainerDirective(node)) {
        return
      }

      // Extract title from the attributes
      let title: string | undefined = Object.keys(node.attributes ?? {}).join(' ')
      let contentNodes = node.children
      const firstChild = node.children[0]

      // Check if the first child has directiveLabel
      if (firstChild !== undefined && (firstChild.data as { directiveLabel?: boolean })?.directiveLabel === true) {
        // Extract title from the directiveLabel node
        title = extractTextContent(firstChild as Parent)
        contentNodes = node.children.slice(1)
      }

      // Transform the mdast directive node to a hast aside node
      // See https://github.com/syntax-tree/mdast-util-to-hast#fields-on-nodes
      node.data = {
        hName: 'aside',
        hProperties: {
          type: node.name,
          ...(title !== undefined && title.length > 0 ? { title } : {}),
          className: `admonition admonition-${node.name}`,
        },
      }
      node.children = contentNodes
    })
  }
}
