import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Private Route that redirects to /login if the user is not authenticated
const PrivateRoute = ({ children }) => {
  const { user, authToken } = useContext(AuthContext);

  // Ensure user and valid token are both available
  return user && authToken ? children : <Navigate to="/login" />;
};

// Private Route that redirects to /Dashbord if the user is authenticated (for login page)
const PrivateRouteLogin = ({ children }) => {
  const { user, authToken } = useContext(AuthContext);

  // If the user is authenticated, redirect to dashboard
  return user && authToken ? <Navigate to="/Dashbord" /> : children;
};

export default PrivateRoute;
export { PrivateRouteLogin };
