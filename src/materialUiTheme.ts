import { createTheme } from '@mui/material/styles';

const baseThemeColor = '#1677FF';
const fonts = `"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const materialUiTheme = createTheme({
  palette: {
    primary: {
      main: baseThemeColor,
    },
  },

  typography: {
    fontFamily: fonts,
    button: {
      textTransform: 'none',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '40px',
          borderRadius: '8px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:disabled': {
            outline: '1px solid #D9D9D9',
            outlineOffset: '-1px',
            backgroundColor: '#0000000A',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '16px',
          '&::placeholder': {
            color: '#00000040',
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#D9D9D9',
          borderRadius: '8px',
        },
        root: {
          minHeight: '40px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: baseThemeColor,
            boxShadow: '0px 0px 0px 2px #0591FF1A',
          },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF4D4F',
            },
        },
      },
    },
  },
});

export default materialUiTheme;
