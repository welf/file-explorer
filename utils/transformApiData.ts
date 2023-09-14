import { Tree, TreeFromApi } from '@/types'

export const transformApiData = (data: TreeFromApi[], nestLevel = 0): Tree[] => {
  return data.map((item) => {
    const { children, ...rest } = item
    const transformedItem: Tree = {
      ...rest,
      nestLevel,
      open: false,
    }
    if (children && children.length > 0) {
      transformedItem.children = transformApiData(children, nestLevel + 1)
    }
    return transformedItem
  })
}
