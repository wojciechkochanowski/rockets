import { Drawer, Box, Divider, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DetailTabs from "./DetailTabs"
import { TDrawerProps } from "../Layout"

export default function Sidebar(props: TDrawerProps) {
  const { drawerWidth, drawerOpen, toggleDrawer} = props
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: [
          theme => ({
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            overflowX: 'hidden',
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
        <IconButton onClick={() => toggleDrawer(false)}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <div>
        <Divider />
        <DetailTabs/>
      </div>
    </Drawer>
  )
}
