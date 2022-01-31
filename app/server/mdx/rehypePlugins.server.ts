/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
// @ts-nocheck
import type * as H from 'hast'

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

export function rehypeMetaAttrs() {
  return async function rehypeMetaAttrsFunction(tree: H.Root) {
    const { visit } = await import('unist-util-visit')
    visit(tree, 'element', function visitor(node, index, parentNode) {
      var match

      if (node.tagName === 'code' && node.data && node.data.meta) {
        re.lastIndex = 0 // Reset regex.

        while ((match = re.exec(node.data.meta as string))) {
          node.properties[match[1]] = match[2] || match[3] || match[4] || ''
          parentNode.properties[match[1]] =
            match[2] || match[3] || match[4] || ''
        }
      }
    })
  }
}
