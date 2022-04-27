import type { Parent } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Markdown abstract syntax tree node definition.
 * @see https://github.com/syntax-tree/mdast
 */
interface ContainerDirective extends Parent {
  name: string;
  attributes: Record<string, string>;
  value?: string;
}

export default function remarkAdmonitions() {
  return (tree: any) => {
    visit(tree, (node: ContainerDirective) => {
      if (node.type === 'containerDirective') {
        const title = Object.keys(node.attributes).join(' ');

        // Add `<strong class="admonition-title">{title}</strong>`
        if (title) {
          node.children.unshift({
            type: 'strong',
            children: [{ type: 'text', value: title }],
            data: {
              hName: 'strong',
              hProperties: {
                className: 'admonition-title',
              },
            },
          });
        }

        // Change container html element to `<aside class="admonition admonition-*">`,
        node.data = {
          hName: 'aside',
          hProperties: {
            className: `admonition admonition-${node.name}`,
          },
        };
      }
    });
  };
}
