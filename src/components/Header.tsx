import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {Checklist, Image} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {authenticationReducer} from "../store/slices/authentication";
import {useGetMeAvatarQuery, useGetMeQuery} from "../services/authentication";
import {store} from "../store";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps): JSX.Element {
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(authenticationReducer.actions.logout());
  }


  const user = useSelector(() => store.getState().authentication.user);
  console.log(user);
  const data = useGetMeAvatarQuery(user.id);

  console.log(data);

  return (
    <Box>
      <AppBar position={'sticky'}>
        <Toolbar>
          <Checklist sx={{ mr: 2 }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color='error' variant='contained' onClick={handleLogout}>
            <Box sx={{ mr: 1 }} display={'flex'} justifyContent={'center'}>
              <img src={data.data} width={'25px'} />
            </Box>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
