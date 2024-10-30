import React, { useContext, useState } from "react";
import {
  Inbox,
  RefreshCw,
  Search,
  Trash2,
  TvMinimal,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbEllipsis,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { darkBackground, lightBackground } from "@/components/Colors";
import useDebounce from "@/hooks/useDebounce";

const Customers = () => {
  const { setOpenCustomerForm, openCustomerForm, storeCustomerData,deleteCustomer,mode,customerSearchTerm, setCustomerSearchTerm,user } =
    useContext(Context);

    const debouncedSearchTerm = useDebounce(customerSearchTerm, 500);

    const filteredCustomerData = storeCustomerData.filter((customer) =>
    customer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    customer.country.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
    customer.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
    customer.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  

  return (
    <div className={`w-full min-h-screen ${mode ? darkBackground : lightBackground} justify-center flex flex-col items-center`}>
      <div className="w-[94%]  shadow-2xl shadow-[#435349]   px-10 py-10  rounded-sm ">
        <div className="flex pb-10 gap-3">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <li>Customer</li>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <li>aaaa</li>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
             value={customerSearchTerm}
             onChange={(e) => setCustomerSearchTerm(e.target.value)}
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Button className={" flex gap-3"}>
            <RefreshCw size={16} /> Refresh
          </Button>
          {
            user.role == "client" ? null :
          <Button
            className={"bg-[#20bb59]"}
            onClick={() => setOpenCustomerForm(!openCustomerForm)}
          >
            Add Client
          </Button>
          }
        </div>
        <Table className={"bg-white"}>
          <TableHeader>
            <TableRow className={"bg-[#f7f9fb]"}>
              <TableHead className="w-[100px] text-[#2b2d3b]" >Sr.No</TableHead>
              <TableHead className="text-[#2b2d3b]" >Type</TableHead>
              <TableHead className="text-[#2b2d3b]" >Name</TableHead>
              <TableHead className="text-[#2b2d3b]" >Country</TableHead>
              <TableHead className="text-[#2b2d3b]" >Phone</TableHead>
              <TableHead className="text-left text-[#2b2d3b]" >Email</TableHead>
              <TableHead className="text-right text-[#2b2d3b]" ></TableHead>
            </TableRow>
          </TableHeader>

          {!filteredCustomerData.length ? (
            <TableCaption className="w-full">
              <Inbox size={40} />
              NO DATA FOUND
            </TableCaption>
          ) :
          <TableBody>
            {filteredCustomerData.map((client, id) => (
              <TableRow key={client?._id}>
                <TableCell className="font-medium py-8">{id + 1}</TableCell>
                <TableCell className="font-medium">
                  <h1
                    className={`${
                      client?.type === "people" ? "bg-[#2b2d3b]" : "bg-[#20bb59]"
                    } text-center py-2 rounded-lg text-[white]`}
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
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4 text-[#20bb59]" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem className="flex gap-3 text-[#20bb59]">
                        <TvMinimal size={16} />
                        Show
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="flex gap-3 text-[#20bb59]" onClick={() => deleteCustomer(client._id)}>
                        <Trash2 size={16} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
            }
        </Table>
      </div>
      <CustomerForm />
    </div>
  );
};

export default Customers;
