import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@/context/Context";

const PublicRoutes = () => {
  const { user } = useContext(Context);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
