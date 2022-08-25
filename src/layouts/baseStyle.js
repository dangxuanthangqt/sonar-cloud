import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  colors: {
    white: '#ffffff',
    gray: '#6E6F7D',
    text_color: '#12293E',
    gray_light: '#6D6D6D',
    lightGray: {
      100: '#F5F6F7',
    },
    darkGray: {
      100: '#C1C6CA',
    },
    green: '#00A876',
    red: {
      100: '#F2D0D5',
      200: '#D61834',
      300: '#BD152E',
    },
    black: '#434453',
    graybg: '#A1A1A1',
  },
  palette: {
    primary: {
      light: '#EDF4FB',
      main: '#0F81C0',
    },
    secondary: {
      light: '#E0E0E0',
      main: '#12293E',
      dark: '#E9EBEF',
      ligt_bg: '#F7F7F7',
      tab_bg: '#49494920',
    },
  },
  typography: {
    fontFamily: 'Roboto,Poppins,Helvetica Neue,Helvetica,Arial,sans-serif',
    h4: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.02rem',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0px 0px 7px 1px rgb(0,0,0,0.14)',
          fontSize: '12px',
          padding: '1rem',
        },
        arrow: {
          color: 'white',
          '&::before': {
            boxShadow: '-1px -1px 10px -2px rgb(0,0,0,0.14)',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: 'red',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          verticalAlign: 'baseline',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        contained: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: 200,
        },
      },
    },
  },
});
