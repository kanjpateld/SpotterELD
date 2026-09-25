import { createTheme } from '@mui/material/styles';

// Brand palette: primary (deep logistics blue), secondary (amber accent),
// tertiary (teal, used for status/compliance accents throughout the app).
const primary = {
  main: '#0B3D66',
  light: '#3D6B93',
  dark: '#062843',
  contrastText: '#FFFFFF',
};

const secondary = {
  main: '#F2994A',
  light: '#F7B679',
  dark: '#C97A2E',
  contrastText: '#1A1A1A',
};

const tertiary = {
  main: '#0F9D8F',
  light: '#4CBFB3',
  dark: '#0B756B',
  contrastText: '#FFFFFF',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary,
    secondary,
    tertiary,
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    error: { main: '#C62828' },
    text: {
      primary: '#16232E',
      secondary: '#51636F',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: primary.main,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(16, 35, 46, 0.08), 0 1px 2px rgba(16, 35, 46, 0.06)',
          border: '1px solid rgba(16, 35, 46, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
