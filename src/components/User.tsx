import React from 'react';
import { useGetMeQuery } from '../services/authentication';
import { Button } from '@mui/material';

export default function User(): React.ReactElement {
  const { data, error, isLoading, isFetching, refetch } = useGetMeQuery();

  return (
    <div>
      <Button
        variant='contained'
        onClick={async (): void => await refetch()}
        disabled={isFetching}
      >
        {isFetching ? 'Fetching...' : 'Refetch'}
      </Button>
      {error !== undefined ? (
        <div>
          <p>Code: {error.data.code}</p>
          <p>Message: {error.data.message}</p>
        </div>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data !== undefined ? (
        <div>
          <p>Firstname: {data.firstname}</p>
          <p>Lastname: {data.lastname}</p>
          <p>Login: {data.login}</p>
          <p>Mail: {data.mail}</p>
        </div>
      ) : (
        'Pas de données'
      )}
    </div>
  );
}
