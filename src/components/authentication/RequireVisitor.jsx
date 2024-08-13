import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUserContext } from '../../context/CurrentUserContext';

const RequireVisitor = () => {
  const { user } = useCurrentUserContext();

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to='/' replace />;
};

export default RequireVisitor;
