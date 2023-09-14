import { Breadcrumbs, SelectedTree, Tree } from '@/types'
import { renderTreeArray } from './renderTreeArray'

const getTreeByBreadcrumbAndSetOpen = (trees: Tree[], breadcrumb: Array<string>, name: string): Tree => {
  if (breadcrumb.length === 0) {
    return {
      ...trees.find(tree => tree.name === name)!,
      open: true,
    }
  }
  const parent = trees.find(tree => tree.name === breadcrumb[0])!
  const child = getTreeByBreadcrumbAndSetOpen(parent.children!, breadcrumb.slice(1), name)
  return {
    ...parent,
    open: true,
    children: [child]
  }
}

const filterTrees = (trees: Tree[], breadcrumbsEntries: [string, Array<string>][]): Tree[] => {
  const filteredTrees: Tree[] = breadcrumbsEntries.map(([name, breadcrumb]: [string, Array<string>]): Tree => {
    return getTreeByBreadcrumbAndSetOpen(trees, breadcrumb, name)
  })
  return filteredTrees
}

export const renderTrees = (
  trees: Tree[],
  breadcrumbs: Breadcrumbs,
  selectedTree: SelectedTree | null,
  input: string
) => {
  if (input.length === 0) {
    return renderTreeArray(trees, selectedTree)
  }

  const filteredBreadcrumbsEntries: [string, Array<string>][] = Object
    .entries(breadcrumbs)
    .filter(([key]) => key.endsWith('file') && key.split('-')[0].includes(input))
    .map(([key, array]) => [key.split('-')[0], [...array]])

  const filteredTrees = filterTrees(trees, filteredBreadcrumbsEntries)
  const suffices = filteredBreadcrumbsEntries.map(([key, arr]) => `${arr.join('-')}-${key}`)
  
  return renderTreeArray(filteredTrees, selectedTree, suffices)
}
