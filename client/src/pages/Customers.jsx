import React, { useContext } from "react";
import { Inbox, RefreshCw, Search, Trash2, TvMinimal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomerForm from "../components/CustomerForm";
import { Context } from "@/context/Context";
import {
  darkBackground,
  darkTableColor,
  lightBackground,
} from "@/components/Colors";
import useDebounce from "@/hooks/useDebounce";
import CustomerDetail from "@/components/CustomerDetail";
import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb";

const Customers = () => {
  const {
    setOpenCustomerForm,
    openCustomerForm,
    storeCustomerData,
    deleteCustomer,
    mode,
    customerSearchTerm,
    setCustomerSearchTerm,
    user,
    getSingleCustomer,
  } = useContext(Context);

  const debouncedSearchTerm = useDebounce(customerSearchTerm, 500);

  const filteredCustomerData = storeCustomerData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      customer.country
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      customer.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div
      className={`w-full min-h-screen ${
        mode ? darkBackground : lightBackground
      } flex justify-center items-center`}
    >
      <div className="w-full max-w-[94%] shadow-2xl shadow-[#435349] px-4 py-6 md:px-10 md:py-10 rounded-sm">
        <div className="flex flex-col md:flex-row pb-6 md:pb-10 gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={customerSearchTerm}
              onChange={(e) => setCustomerSearchTerm(e.target.value)}
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          <Button className="flex gap-3 mt-3 md:mt-0">
            <RefreshCw size={16} /> Refresh
          </Button>
          {user.role !== "client" && (
            <Button
              className="bg-[#20bb59] mt-3 md:mt-0"
              onClick={() => setOpenCustomerForm(!openCustomerForm)}
            >
              Add Client
            </Button>
          )}
        </div>

        {/* Responsive Table */}

        <div className="overflow-x-auto  main-table w-full  ">
          <Table className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>
            <TableHeader>
              <TableRow
                className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}
              >
                <TableHead className="w-[100px]">Sr.No</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-left">Email</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>

            {!filteredCustomerData.length ? (
              <TableCaption className="w-full">
                <Inbox size={40} />
                NO DATA FOUND
              </TableCaption>
            ) : (
              <TableBody>
                {filteredCustomerData.map((client, id) => (
                  <TableRow
                    key={client?._id}
                    className={`${
                      mode ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    <TableCell className="font-medium py-4 md:py-8">
                      {id + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <h1
                        className={`${
                          client?.type === "people"
                            ? "bg-[#2b2d3b]"
                            : "bg-[#20bb59]"
                        } text-center py-2 rounded-lg text-white`}
                      >
                        {client?.type}
                      </h1>
                    </TableCell>
                    <TableCell>{client?.name}</TableCell>
                    <TableCell>{client?.country}</TableCell>
                    <TableCell>{client?.phone}</TableCell>
                    <TableCell>{client?.email}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <BreadcrumbEllipsis className="h-4 w-4 text-[#20bb59]" />{" "}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            className="flex gap-3 text-[#20bb59]"
                            onClick={() => getSingleCustomer(client)}
                          >
                            <TvMinimal size={16} />
                            Show
                          </DropdownMenuItem>
                          {user?.role === "admin" && (
                            <DropdownMenuItem
                              className="flex gap-3 text-[#20bb59]"
                              onClick={() => deleteCustomer(client._id)}
                            >
                              <Trash2 size={16} />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      <CustomerForm />
      <CustomerDetail />
    </div>
  );
};

export default Customers;
