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
import InvoicesForm from "./pages/InvoicesForm";
import InvoicesPaymentForm from "./pages/InvoicesPaymentForm";
import ProductCategory from "./pages/ProductCategory";
import Expense from "./pages/Expense";
import Product from "./pages/Product";
import InvoicesDetail from "./pages/InvoicesDetail";
import QuotesForLead from "./pages/QuotesForLead";
import LeadQuotesForm from "./pages/LeadQuotesForm";
import Login from "./pages/Login";
import PublicRoutes from "./pages/PublicRoutes"; // Import the new PublicRoutes component
import AddUser from "./pages/AddUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useContext } from "react";
import { Context } from "./context/Context";

export default function App() {
  const { user } = useContext(Context);
  return (
    <div className="flex w-full h-screen bg-black">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          {user?.role == "admin"  ? <Route path="/" element={<Home1 />} /> :  <Route path="/" element={<Companies />} />}
          <Route path="/people" element={<Peoples />} />
          {user?.role == "admin" ? <Route path="/company" element={<Companies />} /> : null}
          <Route path="/lead" element={<Lead />} />
          <Route path="/drag" element={<DragLeadSatus />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/invoices-form" element={<InvoicesForm />} />
          <Route
            path="/invoices-payment-form"
            element={<InvoicesPaymentForm />}
          />
          <Route path="/expense-category" element={<ExpenseCategory />} />
          <Route path="/product-category" element={<ProductCategory />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/product" element={<Product />} />
          <Route path="/invoices-detail" element={<InvoicesDetail />} />
          <Route path="/quote-lead" element={<QuotesForLead />} />
          <Route path="/quote-lead-form" element={<LeadQuotesForm />} />
          <Route
            path="/add-user"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AddUser />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>

      {/* Other Components */}
      <CompanyDetailShow />
      <CustomerForm />
    </div>
  );
}
