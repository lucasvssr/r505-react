import React from 'react';
import './App.css';
import { Header } from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { useTheme } from './hooks/useTheme';
import { Gate } from './components/Gate';

export default function App(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Gate>
          <Header title='Tasklists manager !' />
          <Main />
          <Footer toggleTheme={toggleTheme} />
        </Gate>
      </Container>
    </ThemeProvider>
  );
}
