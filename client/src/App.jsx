import { Route, Routes } from "react-router-dom";
import Home1 from "./pages/Home";
import Peoples from "./pages/Peoples";
import Companies from "./pages/Companies";
import CompanyDetailShow from "./components/CompanyDetailShow";
import PrivateRoutes from "./pages/PrivateRoutes";
import CustomerForm from "./components/CustomerForm";
import Lead from "./pages/Lead";
import DragLeadSatus from "./pages/DragLeadSatus";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import ExpenseCategory from "./pages/ExpenseCategory";

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
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/expense-category" element={<ExpenseCategory/>} />

          </Route>
        </Routes>
        <CompanyDetailShow />
        <CustomerForm/>
        
      </div>
    </>
  );
}
