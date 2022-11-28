import React from "react";
import { Navigate } from "react-router-dom";

// code adapted from https://www.makeuseof.com/create-protected-route-in-react/

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
