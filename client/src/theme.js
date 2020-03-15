import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2'
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2'
    },
    secondary: {
      main: '#f48fb1',
    },
  },
})