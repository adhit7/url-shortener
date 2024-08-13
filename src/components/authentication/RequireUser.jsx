import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUserContext } from '../../context/CurrentUserContext';

const RequireUser = () => {
  const location = useLocation();
  const { user } = useCurrentUserContext();

  if (user) {
    return <Outlet />;
  }

  return <Navigate to='/login' state={{ from: location.pathname }} replace />;
};
export default RequireUser;
