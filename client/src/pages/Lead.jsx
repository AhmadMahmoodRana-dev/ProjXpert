import React, { useContext} from "react";
import {
  FilePenLine,
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
import LeadDetailShow from '../components/LeadDetailShow'
import useDebounce from "@/hooks/useDebounce";
import { darkBackground, darkTableColor, lightBackground } from "@/components/Colors";
const Lead = () => {
  const {
    setOpenLeadForm,
    storeLeadData,
    getLeadDetail,
    leadSearchTerm,
    setLeadSearchTerm,
    deleteLead,
    getSingleLead,
    mode,user
  } = useContext(Context);

  const debouncedSearchTerm = useDebounce(leadSearchTerm, 500);

  const filteredleadData = storeLeadData.filter((lead) =>
  lead.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  lead.country.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  lead.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  lead.status.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  return (
    <div className={`w-full min-h-screen ${mode ? darkBackground : lightBackground} justify-center flex flex-col items-center`}>
      <div className="w-[94%]  shadow-2xl shadow-[#435349] rounded-sm px-10 py-10">
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
              value={leadSearchTerm}
              onChange={(e) => setLeadSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Button className={"flex gap-3"}>
            <RefreshCw size={16} /> Refresh
          </Button>
          {
            user.role == "client" ? null :
          <Button
            onClick={() => setOpenLeadForm(true)}
          >
            Add Lead
          </Button>
          }
        </div>
        <Table className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>
          <TableHeader>
            <TableRow className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>
              <TableHead className={`w-[100px] ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Sr.No</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`} >Branch</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Type</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Name</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>status</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Source</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Country</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Phone</TableHead>
              <TableHead className={`text-left ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Email</TableHead>
              <TableHead className={`text-right ${mode ? darkTableColor : "text-[#2b2d3b]"}`}></TableHead>
            </TableRow>
          </TableHeader>
          {!filteredleadData.length ? (
            <TableCaption className="w-full">
              <Inbox size={40} />
              NO DATA FOUND
            </TableCaption>
          ) : (
            <TableBody>
              {filteredleadData.map((lead, id) => (
                <TableRow key={lead?._id} className={`${mode ? "border-gray-600" : "border-gray-200"}`}>
                  <TableCell className="font-medium">{id + 1}</TableCell>
                  <TableCell className="font-medium">
                    {lead?.branch}
                  </TableCell>
                  <TableCell className="font-medium">   <h1
                    className={`${
                      lead?.type === "People" ? "bg-[#2b2d3b]" : "bg-[#20bb59]"
                    } text-center py-2 px-4 rounded-lg text-[white]`}
                  >
                    {lead?.type}
                  </h1></TableCell>
                  <TableCell>{lead?.name || "none"}</TableCell>
                  <TableCell>{lead?.status}</TableCell>
                  <TableCell>{lead?.source}</TableCell>
                  <TableCell>{lead?.country}</TableCell>
                  <TableCell>{lead?.phone}</TableCell>
                  <TableCell className="text-left">{lead?.email}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4 text-[#20bb59]" />
                        <span className="sr-only">Toggle menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => getLeadDetail(lead._id)}
                        >
                          <TvMinimal size={16} />
                          Show
                        </DropdownMenuItem>
                        {user?.role == "client" ? null :
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => getSingleLead(lead)}
                        >
                          <FilePenLine size={16} />
                          Edit
                        </DropdownMenuItem>
                        }
                        {user?.role == "admin" ? 
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => deleteLead(lead._id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenuItem> : null }
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
      <LeadDetailShow/>
    </div>
  );
};

export default Lead;
