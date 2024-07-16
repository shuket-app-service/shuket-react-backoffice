import React from 'react';
import PropTypes from 'prop-types';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AppLoader from './AppLoader';
import { useSelector } from 'react-redux';

const AuthRoutes = ({ children }) => {
  // const { isLoading } = useAuthUser();
  const isLoading = useSelector((state) => state.auth.isLoading);
  console.log('AuthRoutes--', isLoading)
  return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
