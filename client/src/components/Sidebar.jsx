import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Headphones,
  Home,
  Menu,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Store,
  Trash2,
  TvMinimal,
  UserRound,
  Weight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useContext } from "react";
import { Context } from "@/context/Context";
import { Switch } from "@headlessui/react";
import { darkBackground, lightBackground } from "./Colors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const Sidebar = ({ children }) => {
  const location = useLocation(); // Get the current route path
  const {
    storeCompanyData,
    storeCustomerData,
    storePeopleData,
    storeLeadData,
    storeInvoices,
    storeExpenseCategory,
    storeProductCategory,
    storeExpense,
    storeProduct,
    setMode,
    mode,
    logout,
    user
  } = useContext(Context);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div
        className={`hidden border-r ${
          mode ? darkBackground : lightBackground
        } md:block sticky`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14  justify-between items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6 text-white" />
              <span className="text-[#20bb59] font-semibold italic text-2xl">
                ProjXpert
              </span>
            </Link>
            <Switch
              checked={mode}
              onChange={setMode}
              className={`${
                mode ? "bg-[#20bb59]" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out`}
            >
              <span
                className={`${
                  mode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
              />
            </Switch>
          </div>
          <div className="flex-1">
            <nav className=" items-start mt-4 px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === "/"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/customers"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/customers"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Headphones className="h-4 w-4" />
                Customers
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeCustomerData.length}
                </Badge>
              </Link>
              <Link
                to="/people"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/people"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <UserRound className="h-4 w-4" />
                Peoples
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storePeopleData.length}
                </Badge>
              </Link>
              <Link
                to="/company"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/company"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Store className="h-4 w-4" />
                Companies
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeCompanyData.length}
                </Badge>
              </Link>
              <Link
                to="/lead"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/lead"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                Leads
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeLeadData.length}
                </Badge>
              </Link>
              <Link
                to="/invoices"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/invoices"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                Invoices
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeInvoices.length}
                </Badge>
              </Link>
              <Link
                to="/quote-lead"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/quote-lead"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                Quotes For Lead
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeInvoices.length}
                </Badge>
              </Link>
              <Link
                to="/expense-category"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/expense-category"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                ExpenseCategory
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeExpenseCategory.length}
                </Badge>
              </Link>
              <Link
                to="/expense"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/expense"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                Expense
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeExpense.length}
                </Badge>
              </Link>
              <Link
                to="/product-category"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/product-category"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                ProductCategory
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeProductCategory.length}
                </Badge>
              </Link>
              <Link
                to="/product"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/product"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                Product
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeProduct.length}
                </Badge>
              </Link>
              {
                user?.role == "admin" ?
              <Link
                to="/add-user"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                  location.pathname === "/add-user"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground "
                }`}
              >
                <Weight className="h-4 w-4" />
                Add User
                <Badge className="ml-auto flex h-5 w-3 shrink-0 items-center justify-center rounded-full">
                  {storeProduct.length}
                </Badge>
              </Link> : null
              }
              <DropdownMenu className="flex">
                <DropdownMenuTrigger className="flex items-center  gap-3 rounded-lg px-3 py-3 text-muted-foreground hover:text-primary">
                  <Settings className="h-4 w-4 mt-10" />
                  <h1 className="mt-10">Setting</h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="flex gap-3 text-[#20bb59] ">
                    <TvMinimal size={16} />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex gap-3 text-[#20bb59]"
                    onClick={() => logout()}
                  >
                    <Trash2 size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Add more links similarly */}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex md:h-0 h-14 items-center gap-4 px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span className="">CRM</span>
                </Link>
                <Link
                  to="/"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    location.pathname === "/"
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    location.pathname === "/orders"
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  to="/products"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    location.pathname === "/products"
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex min-h-screen h-auto">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
