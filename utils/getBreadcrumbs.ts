import { Breadcrumbs, Tree } from '../types'

export const getBreadcrumbs = (
  trees: Tree[],
  breadcrumbs = {} as Breadcrumbs,
  currentPath = [] as string[]
): Breadcrumbs => {
  trees.forEach((tree) => {
    breadcrumbs[`${tree.name}-${tree.nestLevel}-${tree.type}`] = currentPath
    if (tree.children && tree.children.length > 0) {
      const updatedPath = [...currentPath, tree.name]
      getBreadcrumbs(tree.children, breadcrumbs, updatedPath)
    }
  })
  return breadcrumbs
}