import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
});

export default theme;