import { NavigationTree } from '@/components'
import { TreeContextProvider } from '@/hooks'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-start pl-2">
      <TreeContextProvider>
        <NavigationTree />
      </TreeContextProvider>
    </div>
  )
}
