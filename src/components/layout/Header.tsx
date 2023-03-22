import { AppBar, Toolbar, Typography, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { TDrawerProps } from "../Layout"

export default function Header(props: TDrawerProps) {
  const { drawerWidth, drawerOpen, toggleDrawer} = props
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
          mr: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }))
      ]}
    >
      <Toolbar>
        <Typography
          component="h1"
          variant="h5"
          color="primary.main"
          noWrap
          sx={{
            flexGrow: 1,
            pl: 2
          }}
        >
          Rockets
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          size="small"
          onClick={() => toggleDrawer(true)}
          sx={[ drawerOpen && { display: 'none' } ]}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
