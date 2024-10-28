import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useContext } from "react";
import { Context } from "@/context/Context";

const PrivateRoutes = () => {
  const { user } = useContext(Context);
console.log(user,"USER")
  return user ? (
    <Sidebar>
      <Outlet />
    </Sidebar>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;