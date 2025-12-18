import type { Element, ElementContent, Root, Text } from 'hast'
import type { Parent } from 'unist'
import { visit } from 'unist-util-visit'

function isImgElement(child: ElementContent): child is Element {
  return child.type === 'element' && child.tagName === 'img'
}

function isWhitespaceText(child: ElementContent): child is Text {
  return child.type === 'text' && /^\s*$/.test(child.value)
}

/**
 * Check if a paragraph only contains image elements (and optional whitespace text).
 * This handles cases like:
 * - Single image: `<p><img /></p>`
 * - Multiple images: `<p><img /><img /></p>`
 * - Images with whitespace: `<p> <img /> </p>`
 */
function isImageOnlyParagraph(children: ElementContent[]): boolean {
  if (children.length === 0) {
    return false
  }

  return children.every(child => isImgElement(child) || isWhitespaceText(child))
}

/**
 * Rehype plugin to unwrap images from paragraph elements.
 *
 * In Markdown, standalone images are wrapped in `<p>` tags by default.
 * When using custom MDX components that render `<figure>` for images,
 * this creates invalid HTML: `<p><figure>...</figure></p>`.
 *
 * This plugin removes the wrapping `<p>` tag when it only contains images,
 * preventing hydration errors in React.
 *
 * @example
 * Before: <p><img src="..." alt="..." /></p>
 * After: <img src="..." alt="..." />
 */
export default function rehypeUnwrapImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index: number | undefined, parent: Parent | undefined) => {
      if (node.tagName !== 'p' || index === undefined || parent === undefined) {
        return
      }

      if (isImageOnlyParagraph(node.children)) {
        // Extract only the img elements (filter out whitespace text nodes)
        const imageNodes = node.children.filter(isImgElement)

        // Replace the paragraph with its image children
        parent.children.splice(index, 1, ...imageNodes)

        // Return the index to revisit this position since we modified the tree
        return index
      }
    })
  }
}
