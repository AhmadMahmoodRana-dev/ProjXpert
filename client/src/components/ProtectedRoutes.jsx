// ProtectedRoute.js
import { Context } from "@/context/Context";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useContext(Context);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoutes;
