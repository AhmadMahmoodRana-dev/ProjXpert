import React, { useContext, useState } from "react";
import {
  FilePenLine,
  HandCoins,
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
import { Context } from "@/context/Context";
// import CompanyForm from "@/components/CompanyForm";
import LeadForm from "@/components/LeadForm";
import { Link } from "react-router-dom";

const Invoices = () => {
  const {
    storeInvoices,
    getSingleinvoice,
    getCompanyDetail,
    cmpSearchTerm,
    setCmpSearchTerm,
    deleteInvoice,
    getSingleLead
  } = useContext(Context);

  return (
    <div className="w-full min-h-screen bg-[#172332] justify-center flex flex-col items-center">
      <div className="w-[94%] bg-white px-10 py-10">
        <div className="flex pb-10 gap-3">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <li>LEAD</li>
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
              type="search"
              value={cmpSearchTerm}
              onChange={(e) => setCmpSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Button className={"bg-[#172332] flex gap-3"}>
            <RefreshCw size={16} /> Refresh
          </Button>
          <Link to={'/invoices-form'}>
          <Button
            className={"bg-[#172332]"}
            
          >
            Add Invoices
          </Button>

          </Link>
        </div>
        <Table className={"bg-white"}>
          <TableHeader>
            <TableRow className={"bg-[#172332]"}>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>ExpireDate</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-left">Number</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          {!storeInvoices.length ? (
            <TableCaption className="w-full">
              <Inbox size={40} />
              NO DATA FOUND
            </TableCaption>
          ) : (
            <TableBody>
              {storeInvoices.map((invoice, id) => (
                <TableRow key={invoice?._id}>
                  <TableCell className="font-medium">{id + 1}</TableCell>
                  <TableCell className="font-medium">
                    {invoice?.client}
                  </TableCell>
                  <TableCell>{invoice?.date.slice(0 ,10)}</TableCell>
                  <TableCell>{invoice?.expireDate.slice(0 ,10)}</TableCell>
                  <TableCell>{invoice?.total}</TableCell>
                  <TableCell>{invoice?.paidAmount}</TableCell>
                  <TableCell>{invoice?.status}</TableCell>
                  <TableCell>{invoice?.paymentStatus}</TableCell>
                  <TableCell className="text-left">{invoice?.number}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          className="flex gap-3"
                          onClick={() => getCompanyDetail(company._id)}
                        >
                          <TvMinimal size={16} />
                          Show
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex gap-3"
                          onClick={() => getSingleLead(invoice)}
                        >
                          <FilePenLine size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex gap-3"
                          onClick={() => deleteInvoice(invoice._id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex gap-3"
                          onClick={() => getSingleinvoice(invoice)}
                        >
                          <HandCoins size={16}  />
                          Payment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
      <LeadForm/>
    </div>
  );
};

export default Invoices;
