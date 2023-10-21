import React from 'react';
import { Button, Container } from '@mui/material';
import {
  CheckCircle,
  ErrorOutline,
  InfoSharp,
  Warning,
} from '@mui/icons-material';
import { store } from '../store';
import { notificationsReducer } from '../store/slices/notifications';

export default function Info(): React.ReactElement {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
      }}
    >
      <Button
        variant='outlined'
        color='error'
        startIcon={<ErrorOutline />}
        sx={{
          '&:hover': {
            boxShadow: '0px 0px 20px',
          },
        }}
        onClick={() => {
          store.dispatch(
            notificationsReducer.actions.addNotification({
              content: 'Error !',
              type: 'error',
            })
          );
        }}
      >
        ERROR
      </Button>
      <Button
        variant='outlined'
        color='warning'
        startIcon={<Warning />}
        sx={{
          '&:hover': {
            boxShadow: '0px 0px 20px',
          },
        }}
        onClick={() => {
          store.dispatch(
            notificationsReducer.actions.addNotification({
              content: 'Warning !',
              type: 'warning',
            })
          );
        }}
      >
        WARNING
      </Button>
      <Button
        variant='outlined'
        color='info'
        startIcon={<InfoSharp />}
        sx={{
          '&:hover': {
            boxShadow: '0px 0px 20px',
          },
        }}
        onClick={() => {
          store.dispatch(
            notificationsReducer.actions.addNotification({
              content: 'Info !',
              type: 'info',
            })
          );
        }}
      >
        INFO
      </Button>
      <Button
        variant='outlined'
        color='success'
        startIcon={<CheckCircle />}
        sx={{
          '&:hover': {
            boxShadow: '0px 0px 20px',
          },
        }}
        onClick={() => {
          store.dispatch(
            notificationsReducer.actions.addNotification({
              content: 'Success !',
              type: 'success',
            })
          );
        }}
      >
        Success
      </Button>
    </Container>
  );
}
