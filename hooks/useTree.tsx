'use client'
import { Breadcrumbs, SelectedTree, Tree, TreeContextType, TreeFromApi, TreeType } from '@/types'
import { findTreeItem, getBreadcrumbs, transformApiData } from '@/utils'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

const initialTreeContext: TreeContextType = {
  trees: [],
  breadcrumbs: {},
  selectedTree: null,
  handleTreeClick: () => { }
}

export const TreeContext = createContext<TreeContextType>(initialTreeContext)

export const TreeContextProvider = ({ children }: TreeContextProviderProps) => {
  const [trees, setTrees] = useState<Tree[]>([])
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs>({})
  const [selectedTree, setSelectedTree] = useState<SelectedTree | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchTree = async () => {
      try {
        const response = await fetch('path.json', { signal: abortController.signal })
        const data: TreeFromApi[] = await response.json()
        const transformedData = transformApiData(data)
        const breadcrumbs = getBreadcrumbs(transformedData)
        
        setTrees(() => transformedData)
        setBreadcrumbs(() => breadcrumbs)
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }
        console.error(error)
      }
    }
    fetchTree()
    return () => {
      abortController.abort()
    }
  }, [])

  const toggleOpen = (name: string, nestLevel: number, type: TreeType) => {
    const treeToUpdate = findTreeItem(name, nestLevel, type, trees, breadcrumbs)
    treeToUpdate.open = !treeToUpdate.open
    setTrees(() => [...trees])
  }

  const handleTreeClick = (name: string, type: TreeType, nestLevel: number) => {
    // If the current selected tree is not the same as the clicked tree, update the selected tree
    if (selectedTree?.name !== name || selectedTree?.nestLevel !== nestLevel || selectedTree?.type !== type) {
      setSelectedTree(() => ({ name, nestLevel, type }))
    }

    if (type === 'folder') {
      toggleOpen(name, nestLevel, type)
    } else {
      const breadcrumb = breadcrumbs[`${name}-${nestLevel}-${type}`]
      console.log(`File selected: ${breadcrumb.join('/')}${breadcrumb.length === 0 ? '' : '/'}${name}`)
    }
  }

  return (
    <TreeContext.Provider value={{ trees, breadcrumbs, selectedTree, handleTreeClick }}>
        {children}
    </TreeContext.Provider>
  )
}



export const useTree = () => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error('useTree must be used within a TreeContextProvider')
  }
  return context
}

type TreeContextProviderProps = {
  children: ReactNode
}