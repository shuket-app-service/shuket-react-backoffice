import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import AppLoader from "./AppLoader";
import { useDispatch, useSelector } from "react-redux";
import history from "../hooks/useHistory";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthRoutes = ({ children }) => {
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      history.navigate = navigate;
   }, [location.pathname]);

   // const { isLoading } = useAuthUser();
   const isLoading = useSelector((state) => state.auth.isLoading);
   console.log("AuthRoutes--", isLoading);
   return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
   children: PropTypes.node.isRequired,
};
