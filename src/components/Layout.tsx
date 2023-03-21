import { ReactNode, useContext } from 'react'
import Box from '@mui/material/Box'
import { SelectionContext } from "@/context/selection/SelectionContext"
import Header from './layout/Header'
import Sidebar from './layout/Sidebar';

const drawerWidth = 240;

export type TDrawerProps = {
  drawerWidth: number,
  drawerOpen: boolean,
  toggleDrawer: (val?: boolean) => void
}

export default function Layout({children}: { children?: ReactNode }) {
  const [ {drawerOpen}, dispatch ] = useContext(SelectionContext)

  const toggleDrawer = (val?: boolean) => {
    dispatch({
      type: "TOGGLE_DRAWER",
      drawerOpen: val
    })
  }

  const drawerProps: TDrawerProps = {
    drawerWidth,
    drawerOpen,
    toggleDrawer
  }

  return (
    <Box component="div" sx={{display: 'flex'}}>
      <Header {...drawerProps}/>
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box 
          component="div" 
          className="appBarSpacer"
          sx={theme => theme.mixins.toolbar}
        />
        <Box 
          component="div"
          className="content"
          sx={{
            flexGrow: 1
          }}
        >
          { children }
        </Box>
      </Box>
      <Sidebar {...drawerProps}/>
    </Box>
  );
}