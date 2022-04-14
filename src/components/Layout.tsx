import { Spinner } from '@blueprintjs/core';
import { useStore } from 'effector-react';
import React from 'react';
import { $isAuthenticated, $isAuthenticating } from '../features/auth/auth.model';
import Navigation from './Navigation';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const isAuthenticated = useStore($isAuthenticated);
  const isAuthenticating = useStore($isAuthenticating);

  if (isAuthenticating) {
    return <Spinner className="absolute translate-x-1/2 top-1/2 right-1/2" />;
  }

  return (
    <main>
      {isAuthenticated && <Navigation />}
      {children}
    </main>
  );
};

export default Layout;
