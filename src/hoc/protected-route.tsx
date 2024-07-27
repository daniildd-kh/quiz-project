import React from 'react';
import { useAppSelector } from '../services/store/store';
import Preloader from '../components/ui/preloader/preloader';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: TProtectedRouteProps) => {
  const location = useLocation();
  const authRequest = useAppSelector((state) => state.userSlice.authRequest);
  const user = useAppSelector((state) => state.userSlice.user);

  if (authRequest) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  return component;
};

export const OnlyAuthRoute = ProtectedRoute;

export const OnlyUnAuthRoute = ({
  component,
}: {
  component: React.ReactElement;
}) => <ProtectedRoute onlyUnAuth={true} component={component} />;
