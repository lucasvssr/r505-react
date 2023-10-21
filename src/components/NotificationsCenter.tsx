import React, { type ReactElement, useEffect, useState } from 'react';
import { Notifications } from '@mui/icons-material';
import {
  Alert,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Snackbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsReducer } from '../store/slices/notifications';
import { store } from '../store'; // Import RootState

export function NotificationsCenter(): ReactElement {
  const dispatch = useDispatch();

  const notifications = useSelector(() => store.getState().notifications);
  const lastNotification =
    notifications.length > 0 ? notifications[notifications.length - 1] : null;

  useEffect(() => {
    setTimeout(() => {
      if (notifications.length > 0) {
        dispatch(
          notificationsReducer.actions.hideNotification({
            id: lastNotification?.id,
          })
        );
      }
    }, 3000);
  }, [notifications]);

  const [open, setOpen] = useState(false);

  const handleClick = (): void => {
    if (notifications.length > 0) {
      dispatch(
        notificationsReducer.actions.hideNotification({
          id: lastNotification?.id,
        })
      );
    }
    setOpen((prev) => !prev);
  };

  const handleClose = (): void => {
    setOpen((prev) => !prev);
  };

  const handleDeleteAll = (): void => {
    dispatch(notificationsReducer.actions.deleteAllNotifications());
    handleClose();
  };

  const handleDelete = (id: number): void => {
    dispatch(notificationsReducer.actions.deleteNotification({ id }));
    if (notifications.length === 1) {
      console.log(notifications);
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        color='secondary'
        sx={{ border: '1px solid' }}
        onClick={handleClick}
      >
        <Badge badgeContent={notifications.length} color='error'>
          <Notifications />
        </Badge>
      </IconButton>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={lastNotification?.visible}
        message={lastNotification?.content}
      >
        <Alert severity={lastNotification?.type} sx={{ width: '100%' }}>
          {lastNotification?.content}
        </Alert>
      </Snackbar>

      <Drawer
        anchor='right'
        open={open}
        onClose={handleClose}
        variant='temporary'
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '13pc',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification.id}>
                <Alert
                  severity={notification.type}
                  onClose={() => {
                    handleDelete(notification.id);
                  }}
                  closeText={'Delete'}
                  sx={{ width: '100%' }}
                >
                  {notification.content}
                </Alert>
              </ListItem>
            ))}
          </List>
          <Button
            onClick={handleDeleteAll}
            variant='contained'
            sx={{ justifySelf: 'end' }}
          >
            Delete all
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
