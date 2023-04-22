import Image from 'next/image'
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
      <Toolbar sx={{px: 1}}>
        <Typography
          component="h1"
          variant="h5"
          color="primary.main"
          noWrap
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Image src='/logo.png' width={125} height={25} alt='Rockets' />
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
