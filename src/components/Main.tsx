import React from 'react';
import Info from './Info';
import { Box } from '@mui/material';
import User from './User';

export default function Main(): React.ReactElement {
  return (
    <Box
      component='main'
      className='MainContent'
      flex='1'
      display='flex'
      flexDirection='column'
      padding={1}
    >
      <Info />
      <User />
    </Box>
  );
}
