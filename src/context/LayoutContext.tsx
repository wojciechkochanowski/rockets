import { createContext, useState, PropsWithChildren } from 'react'

const initialValue = {
  drawerOpen: false,
  setDrawerOpen: () => {}
}

export const LayoutContext = createContext<TLayoutContext>(initialValue)

export type TLayoutContext = {
  drawerOpen: boolean,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LayoutContextProvider(props: PropsWithChildren) {
  const { children } = props
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <LayoutContext.Provider value={{drawerOpen, setDrawerOpen}}>
      {children}
    </LayoutContext.Provider>
  )
}
