import Sidebar from "@/components/Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
   const user = true;
   return user ? (
    <Sidebar>

    <Outlet/>
    </Sidebar>

   )
   :
   (<Navigate to={"/login"} />)
}

export default PrivateRoutes
