import React from 'react';
import { useSelector } from 'react-redux';
import { LoginForm } from './LoginForm';
import { store } from '../store';

interface GateProps {
  children: React.ReactNode;
}

export function Gate({ children }: GateProps): React.ReactElement {
  return useSelector(() => store.getState().authentication.connected) ? (
    <>{children}</>
  ) : (
    <LoginForm />
  );
}
