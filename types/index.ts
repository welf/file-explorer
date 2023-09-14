export interface TreeFromApi {
  name: string
  type: 'file' | 'folder'
  children?: TreeFromApi[]
}

export interface Tree extends TreeFromApi {
  nestLevel: number
  open: boolean
  children?: Tree[]
}

export interface Breadcrumbs {
  [key: string]: string[]
}

export interface SelectedTree {
  name: string
  type: TreeType
  nestLevel: number
}

export type TreeType = 'file' | 'folder'

export type TreeContextType = {
  trees: Tree[]
  breadcrumbs: Breadcrumbs
  selectedTree: SelectedTree | null
  handleTreeClick: (name: string, type: TreeType, nestLevel: number) => void
}