import { Route, Routes } from "react-router-dom";
import Home1 from "./pages/Home";
import Peoples from "./pages/Peoples";
import Companies from "./pages/Companies";
import CompanyDetailShow from "./components/CompanyDetailShow";
import PrivateRoutes from "./pages/PrivateRoutes";
import CustomerForm from "./components/CustomerForm";
import Lead from "./pages/Lead";
import DragLeadSatus from "./pages/DragLeadSatus";

export default function App() {
  return (
    <>
      <div className="flex w-full h-screen">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home1 />} />
            <Route path="/people" element={<Peoples />} />
            <Route path="/company" element={<Companies />} />
            <Route path="/lead" element={<Lead />} />
            <Route path="/drag" element={<DragLeadSatus />} />
          </Route>
        </Routes>
        <CompanyDetailShow />
        <CustomerForm/>
        
      </div>
    </>
  );
}
