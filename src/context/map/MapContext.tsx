import { createContext, useReducer, PropsWithChildren } from 'react'
import { TMapAction, TMapContext } from '@/types'
import mapReducer from '@/context/map/mapReducer'

const initialValue:TMapContext = {
  zoom: 2
}

export const MapContext = createContext<[
  TMapContext, 
  React.Dispatch<TMapAction>
]>([
  initialValue,
  () => null
])

export default function MapContextProvider(props: PropsWithChildren) {
  const { children } = props
  const [state, dispatch] = useReducer(mapReducer, initialValue)
  return (
    <MapContext.Provider value={[state, dispatch]}>
      {children}
    </MapContext.Provider>
  )
}
