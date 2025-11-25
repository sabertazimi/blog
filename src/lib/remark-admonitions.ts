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
 * Extract text content from a node recursively.
 * Converts all formatted content (emphasis, strong, delete, inlineCode, etc.) to plain text.
 */
function extractTextContent(node: Node): string {
  let text = ''

  if (node.type === 'text' && 'value' in node && typeof node.value === 'string') {
    return node.value
  }

  if (node.type === 'inlineCode' && 'value' in node && typeof node.value === 'string') {
    return node.value
  }

  // Handle nodes with children (paragraph, emphasis, strong, delete, etc.)
  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      text += extractTextContent(child as Node)
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

      // Check if the first child has directiveLabel (e.g :::tip[title])
      if (
        firstChild !== undefined
        && 'data' in firstChild
        && typeof firstChild.data === 'object'
        && firstChild.data !== null
        && 'directiveLabel' in firstChild.data
        && firstChild.data.directiveLabel === true
      ) {
        title = extractTextContent(firstChild)
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
