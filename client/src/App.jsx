import { Route, Routes } from "react-router-dom";
import Home1 from "./pages/Home";
import Peoples from "./pages/Peoples";
import Companies from "./pages/Companies";
import CompanyDetailShow from "./components/CompanyDetailShow";
import PrivateRoutes from "./pages/PrivateRoutes";

export default function App() {
  return (
    <>
      <div className="flex w-full h-screen">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home1 />} />
            <Route path="/people" element={<Peoples />} />
            <Route path="/company" element={<Companies />} />
          </Route>
        </Routes>
        <CompanyDetailShow />
      </div>
    </>
  );
}
