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
        // Change container html element to `<aside type="*" title="*" class="admonition admonition-*">`,
        node.data = {
          hName: 'aside',
          hProperties: {
            type: node.name,
            title: Object.keys(node.attributes).join(' '),
            className: `admonition admonition-${node.name}`,
          },
        };
      }
    });
  };
}
