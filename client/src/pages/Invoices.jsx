import React, { useContext} from "react";
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
  BreadcrumbEllipsis,
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
import { darkBackground, darkTableColor, lightBackground } from "@/components/Colors";
import useDebounce from "@/hooks/useDebounce";

const Invoices = () => {
  const {
    storeInvoices,
    getSingleinvoice,
    deleteInvoice,
    getSingleinvoiceDetail1,
    getSingleinvoiceDetail,
    mode,
    invoiceSearchTerm, 
    setInvoiceSearchTerm,
    user
  } = useContext(Context);

  const debouncedSearchTerm = useDebounce(invoiceSearchTerm, 500);

  const filteredInvoiceData = storeInvoices.filter((invoice) =>
  invoice.client.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  invoice.currency.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  invoice.status.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  invoice.note.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  return (
    <div className={`w-full min-h-screen ${mode ? darkBackground : lightBackground} justify-center flex flex-col items-center`}>
      <div className="w-full max-w-[94%] shadow-2xl shadow-[#435349] px-4 py-6 md:px-10 md:py-10 rounded-sm">
        <div className="flex flex-col md:flex-row pb-6 md:pb-10 gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={invoiceSearchTerm}
              onChange={(e) => setInvoiceSearchTerm(e.target.value)}
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          <Button className="flex gap-3 mt-3 md:mt-0">
            <RefreshCw size={16} /> Refresh
          </Button>
          {user.role !== "client" && (
            <Link to={'/invoices-form'} className="bg-[#20bb59] mt-3 md:mt-0 rounded-md text-center">

            <Button
              // className="bg-[#20bb59] mt-3 md:mt-0"
            >
              Add Invoices
            </Button>
            </Link>
          )}
        </div>
         {/* Responsive Table */}

         <div className="overflow-x-auto  main-table w-full  ">
        <Table className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>
          <TableHeader>
            <TableRow className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>
              <TableHead className={`w-[100px] ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Sr.No</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`} >Client</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Date</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>ExpireDate</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Total</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Paid</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Status</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Payment</TableHead>
              <TableHead className={`text-left ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Number</TableHead>
              <TableHead className={`text-right ${mode ? darkTableColor : "text-[#2b2d3b]"}`}></TableHead>
            </TableRow>
          </TableHeader>
          {!filteredInvoiceData.length ? (
            <TableCaption className="w-full">
              <Inbox size={40} />
              NO DATA FOUND
            </TableCaption>
          ) : (
            <TableBody>
              {filteredInvoiceData.map((invoice, id) => (
                <TableRow key={invoice?._id} className={`${mode ? "border-gray-600" : "border-gray-200"}`}>
                  <TableCell className="font-medium">{id + 1}</TableCell>
                  <TableCell className="font-medium">
                    {invoice?.client}
                  </TableCell>
                  <TableCell>{invoice?.date.slice(0 ,10)}</TableCell>
                  <TableCell>{invoice?.expireDate.slice(0 ,10)}</TableCell>
                  <TableCell>{invoice?.total}</TableCell>
                  <TableCell>{invoice?.paidAmount}</TableCell>
                  <TableCell>{invoice?.status}</TableCell>
                  <TableCell>{
                    invoice.total === invoice.paidAmount ? (<h3>paid</h3>):(<h3>unpaid</h3>)
                    }</TableCell>
                  <TableCell className="text-left">{invoice?.number}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4 text-[#20bb59]" />
                        <span className="sr-only">Toggle menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => getSingleinvoiceDetail(invoice._id)}
                        >
                          <TvMinimal size={16} />
                          Show
                        </DropdownMenuItem>
                        {user?.role == "client" ? null :
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => getSingleinvoiceDetail1(invoice)}
                        >
                          <FilePenLine size={16} />
                          Edit
                        </DropdownMenuItem>
                        }
                        {user?.role == "admin" ? 
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => deleteInvoice(invoice._id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenuItem> : null }
                        {user?.role == "client" ? null :
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => getSingleinvoice(invoice)}
                        >
                          <HandCoins size={16}  />
                          Payment
                        </DropdownMenuItem>
                        }
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
      <LeadForm/>
    </div>
  );
};

export default Invoices;
