import { useTree } from '@/hooks'
import { TreeType } from '@/types'
import { FcFile, FcFolder, FcOpenedFolder } from 'react-icons/fc'

const getIcon = (props: TreeProps) => {
  const { type, open } = props

  if (type === 'folder') {
    if (open) {
      return <FcOpenedFolder />
    }
    return <FcFolder />
  }
  return <FcFile />
}

const treeStyle = (nestLevel: number, isSelected: boolean | undefined) => {
  const style = {
    display: 'flex',
    paddingLeft: `${nestLevel * 10}px`,
    alignItems: 'center',
    paddingBottom: '0px'
  }

  if (isSelected) {
    return {
      ...style,
      backgroundColor: '#a8acb0'
    }
  }
  return style
}

export const Tree = (props: TreeProps) => {
  const { name, type, nestLevel, isSelected } = props

  const { handleTreeClick } = useTree()

  const handleClick = () => {
    handleTreeClick(name, type, nestLevel)
  }

  return (
    <li style={treeStyle(nestLevel, isSelected)}>
      <i className='pr-1 cursor-pointer' onClick={handleClick}>{getIcon(props)}</i>
      <span className='cursor-pointer' onClick={handleClick}>{name}</span>
    </li>
  )
}

interface TreeProps {
  name: string
  type: TreeType
  open?: boolean
  nestLevel: number
  isSelected?: boolean
}