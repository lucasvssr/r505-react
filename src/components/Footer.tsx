import React from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { DarkModeRounded } from '@mui/icons-material';
import { NotificationsCenter } from './NotificationsCenter';

interface footerProps {
  toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Footer({ toggleTheme }: footerProps): JSX.Element {
  return (
    <Box component='footer'>
      <AppBar position={'sticky'}>
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            onClick={toggleTheme}
            color='secondary'
            sx={{ border: '1px solid' }}
          >
            <DarkModeRounded />
          </IconButton>

          <NotificationsCenter />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
