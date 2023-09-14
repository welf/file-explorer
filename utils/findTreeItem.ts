import { Breadcrumbs, Tree, TreeType } from '../types'

export const getTreeItem = (
  name: string,
  trees: Tree[],
  breadcrumbs: string[]
): Tree => {
  if (breadcrumbs.length === 0) {
    return trees.find((tree) => tree.name === name)!
  }
  const tree = trees.find((tree) => tree.name === breadcrumbs[0])!
  return getTreeItem(name, tree.children!, breadcrumbs.slice(1))
}

export const findTreeItem = (
  name: string,
  nestLevel: number,
  type: TreeType,
  trees: Tree[],
  breadcrumbs: Breadcrumbs
): Tree => {
  const breadcrumb: string[] = breadcrumbs[`${name}-${nestLevel}-${type}`]
  return getTreeItem(name, trees, breadcrumb)
}
