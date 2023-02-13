import { createTheme } from '@mui/material/styles';

const themes = {
  default: createTheme({
    palette: {
      primary: {
        main: '#FFC107',
        contrastText: "#fff",
      },
      typography: {
        button: {
          textTransform: 'none',
        },
      },
    },
  }),

  dark: createTheme({
    palette: {
      primary: {
        main: '#130be3',
        contrastText: "#fff",
      },
      typography: {
        button: {
          textTransform: 'none',
        },
      },
    },
  })
}

export default themes;