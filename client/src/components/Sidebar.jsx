import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  BookOpen,
  ChartPie,
  CreditCard,
  File,
  Headphones,
  Home,
  LeafyGreen,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Store,
  Tag,
  Tags,
  UserRound,
  Users,
  Wallet,
  WalletCards,
  Weight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const Sidebar = ({ children }) => {
  const location = useLocation(); // Get the current route path

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-[#172332] md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6 text-white" />
              <span className="text-white">ProjXpert</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === "/" ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/customers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === "/customers" ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Headphones className="h-4 w-4" />
                Customers
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  3
                </Badge>
              </Link>
              <Link
                to="/people"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === "/people" ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <UserRound className="h-4 w-4" />
                Peoples
              </Link>
              <Link
                to="/company"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === "/company" ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Store className="h-4 w-4" />
                Companies
              </Link>
              <Link
                to="/lead"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === "/lead" ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                Leads
              </Link>
              <Link
                to="/invoices"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === "/invoices" ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Weight className="h-4 w-4" />
                Invoices
              </Link>
              {/* Add more links similarly */}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex md:h-0 h-14 items-center gap-4 px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="">CRM</span>
                </Link>
                <Link
                  to="/"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    location.pathname === "/" ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    location.pathname === "/orders" ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
                </Link>
                <Link
                  to="/products"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    location.pathname === "/products" ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                {/* Add more mobile nav links similarly */}
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
