import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Header from './layout/Header'
import LayoutContextProvider from '@/context/LayoutContext'
import Sidebar from './layout/Sidebar';

const drawerWidth = 240;

export default function Layout({children}: { children?: ReactNode }) {

    return (
      <LayoutContextProvider>
        <Box component="div" sx={{display: 'flex'}}>
          <Header drawerWidth={drawerWidth}/>
          <Sidebar drawerWidth={drawerWidth}/>
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
        </Box>
      </LayoutContextProvider>
    );
}