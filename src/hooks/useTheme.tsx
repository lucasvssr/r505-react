import { type Theme } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#fff',
    },
    background: {
      default: '#272626',
      paper: '#2B2929',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#fff',
    },
    background: {
      default: '#fff',
    },
  },
});

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(userTheme ? darkTheme : lightTheme);
  function toggleTheme(): void {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  }
  return { theme, toggleTheme };
}
