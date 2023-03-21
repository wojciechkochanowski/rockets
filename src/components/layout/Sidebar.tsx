import { useContext } from "react"
import { Drawer, Box, List, Divider, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { TLayoutContext, LayoutContext } from "@/context/LayoutContext"

export default function Sidebar({ drawerWidth }: { drawerWidth: number }) {
  const {drawerOpen, setDrawerOpen} = useContext<TLayoutContext>(LayoutContext)
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: [
          theme => ({
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          !drawerOpen && (theme => ({
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: 0,
            borderRightWidth: 0
          }))
        ]
      }}          
      open={drawerOpen}
    >
      <Box 
        component="div" 
        sx={theme => ({
          display: 'flex',
          alignItems: 'center',
          px: 1,
          ...theme.mixins.toolbar
        })}
      >
        <IconButton onClick={() => setDrawerOpen(false)}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <div>
      <Divider />
      <List>aaa</List>
      <Divider />
      <List>bbb</List>
      </div>
    </Drawer>
  )
}
