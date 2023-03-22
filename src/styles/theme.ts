import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a6d6ff'
    },
    background: {
      default: '#0e0d12',
      paper: '#0e0d12'
    }
  },
  mixins: {
    toolbar: {
      minHeight: 36
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 12
  },
});

export default theme;