'use client'
import { useTree } from '@/hooks'
import { Breadcrumbs, SelectedTree } from '@/types'
import { renderTrees } from '@/utils'
import { useState } from 'react'

const getNavHeader = (breadcrumbs: Breadcrumbs, selectedTree: SelectedTree | null) => {
  if (!selectedTree) {
    return <h6 className='mb-1 font-semibold'>Files</h6>
  }

  const { name, nestLevel, type } = selectedTree
  const breadcrumb = breadcrumbs[`${name}-${nestLevel}-${type}`] || []
  return <h6 className='italic mb-1 font-semibold'>{`${breadcrumb.join('/')}${breadcrumb.length === 0 ? '' : '/'}${name}`}</h6>
}

export const NavigationTree = () => {
  const { trees, selectedTree, breadcrumbs } = useTree()
  const [input, setInput] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value)
  }
  
  return (
    <nav className="w-80 h-screen overflow-y-auto border-r border-zinc-500">
      {getNavHeader(breadcrumbs, selectedTree)}
      <input
        className="w-full px-2 py-1 border-b border-zinc-500 focus:outline-none my-2"
        placeholder="Search"
        value={input}
        onChange={handleInputChange}
      />
      <ul className="list-none p-0 m-0">
        {renderTrees(trees, breadcrumbs, selectedTree, input)}
      </ul>
    </nav>
  )
}
