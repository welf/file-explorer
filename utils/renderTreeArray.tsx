import { Tree as TreeComponent } from '@/components'
import { SelectedTree, Tree } from '@/types'
import { Fragment } from 'react'

export const renderTreeArray = (treeArray: Tree[], selectedTree: SelectedTree | null, suffices = [] as string[]): JSX.Element[] => {
  const suffs: string[] = suffices.length === 0
      ? treeArray.map((_) => '')
      : suffices
  return treeArray.map((tree, idx) => {
    const { name, type, open, children, nestLevel } = tree

    const suffix = suffs[idx]
    const key = `${name}-${nestLevel}-${type}${suffix}`

    if (children && children.length > 0 && open) {
      return (
        <Fragment key={key}>
          <TreeComponent
            name={name}
            type={type}
            open={open}
            nestLevel={nestLevel}
            isSelected={selectedTree?.name === name && selectedTree?.nestLevel === nestLevel && selectedTree?.type === type}
          />
          {renderTreeArray(children, selectedTree)}
        </Fragment>
      )
    }
    
    return (
      <TreeComponent
        name={name}
        type={type}
        open={open}
        nestLevel={nestLevel}
        isSelected={selectedTree?.name === name && selectedTree?.nestLevel === nestLevel && selectedTree?.type === type}
        key={key}
      />
    )
  })
}
