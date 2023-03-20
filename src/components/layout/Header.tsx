import { useContext } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import { TLayoutContext, LayoutContext } from "@/context/LayoutContext"

export default function Header({ drawerWidth }: { drawerWidth: number }) {
  const {drawerOpen, setDrawerOpen} = useContext<TLayoutContext>(LayoutContext)
  return (
    <AppBar
      position="absolute"
      sx={[
        theme => ({
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })
        }),
        drawerOpen && (theme => ({
          ml: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }))
      ]}
    >
      <Toolbar 
        disableGutters={!drawerOpen} 
        sx={{
          pr: 24
        }}
      >
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => setDrawerOpen(true)}
          sx={[
            {
              ml: 1.5,
              mr: 4.5,
            },
            drawerOpen && {
              display: 'none'
            }
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1
          }}
        >
          Rockets
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
