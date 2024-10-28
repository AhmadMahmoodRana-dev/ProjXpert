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
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PublicRoutes from "./pages/PublicRoutes"; // Import the new PublicRoutes component

export default function App() {
  return (
    <div className="flex w-full h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home1 />} />
          <Route path="/people" element={<Peoples />} />
          <Route path="/company" element={<Companies />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/drag" element={<DragLeadSatus />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/invoices-form" element={<InvoicesForm />} />
          <Route path="/invoices-payment-form" element={<InvoicesPaymentForm />} />
          <Route path="/expense-category" element={<ExpenseCategory />} />
          <Route path="/product-category" element={<ProductCategory />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/product" element={<Product />} />
          <Route path="/invoices-detail" element={<InvoicesDetail />} />
          <Route path="/quote-lead" element={<QuotesForLead />} />
          <Route path="/quote-lead-form" element={<LeadQuotesForm />} />
        </Route>
      </Routes>

      {/* Other Components */}
      <CompanyDetailShow />   
      <CustomerForm/>
    </div>
  );
}
