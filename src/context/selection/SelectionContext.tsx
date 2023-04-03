import { createContext, useReducer, PropsWithChildren } from 'react'
import { TSelectionAction, TSelectionContext } from '@/types'
import selectionReducer from '@/context/selection/selectionReducer'

const initialValue:TSelectionContext = {
  drawerOpen: false,
  selectedStar: null,
  namedStars: []
}

export const SelectionContext = createContext<[
  TSelectionContext, 
  React.Dispatch<TSelectionAction>
]>([
  initialValue,
  () => null
])

export default function SelectionContextProvider(props: PropsWithChildren) {
  const { children } = props
  const [state, dispatch] = useReducer(selectionReducer, initialValue)
  return (
    <SelectionContext.Provider value={[state, dispatch]}>
      {children}
    </SelectionContext.Provider>
  )
}
