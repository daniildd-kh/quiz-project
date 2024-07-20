import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#090C11',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#3F6ACB',
    },
    secondary: {
      main: '#89A6EB',
    },
    background: {
      default: '#F2F5FA',
      paper: '#F2F5FA',
    },
    text: {
      primary: '#090C11',
    secondary: '#090C11'

    },
    action: {
      active: '#221200',
    },
    error: {
      main: '#ff0000',
    },
  },
});



export default theme
