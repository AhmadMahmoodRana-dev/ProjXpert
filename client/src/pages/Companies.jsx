import React, { useContext, useState } from "react";
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
import CompanyForm from "@/components/CompanyForm";
import useDebounce from "@/hooks/useDebounce";
import { darkBackground, lightBackground } from "@/components/Colors";

const Companies = () => {
  const {
    setOpenCompanyForm,
    deleteCompany,
    getSingleCompany,
    getCompanyDetail,
    storeCompanyData,
    cmpSearchTerm,
    mode,
    setCmpSearchTerm,
  } = useContext(Context);

  const debouncedSearchTerm = useDebounce(cmpSearchTerm, 500);

  const filteredCompanyData = storeCompanyData.filter((company) =>
  company.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  company.country.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  company.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  company.contact.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  

  return (
    <div className={`w-full min-h-screen ${mode ? darkBackground : lightBackground} justify-center flex flex-col items-center`}>
      <div className="w-[94%] px-10 py-10 shadow-2xl shadow-[#435349] rounded-sm">
        <div className="flex pb-10 gap-3">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <li>aaa</li>
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
          <Button className={"flex gap-3"}>
            <RefreshCw size={16} /> Refresh
          </Button>
          <Button
            onClick={() => setOpenCompanyForm(true)}
          >
            Add Company
          </Button>
        </div>
        <Table className={"bg-[#1f2633]"}>
          <TableHeader>
            <TableRow className={"bg-[#1f2633]"}>
              <TableHead className="w-[100px] text-[#2b2d3b]">Sr.No</TableHead>
              <TableHead className="text-[#2b2d3b]">Name</TableHead>
              <TableHead className="text-[#2b2d3b]">Contact</TableHead>
              <TableHead className="text-[#2b2d3b]">website</TableHead>
              <TableHead className="text-[#2b2d3b]">Country</TableHead>
              <TableHead className="text-[#2b2d3b]">Phone</TableHead>
              <TableHead className="text-left text-[#2b2d3b]">Email</TableHead>
              <TableHead className="text-right text-[#2b2d3b]"></TableHead>
            </TableRow>
          </TableHeader>
          {!filteredCompanyData.length ? (
            <TableCaption className="w-full">
              <Inbox size={40} />
              NO DATA FOUND
            </TableCaption>
          ) : (
            <TableBody>
              {filteredCompanyData.map((company, id) => (
                <TableRow key={company._id}>
                  <TableCell className="font-medium">{id + 1}</TableCell>
                  <TableCell className="font-medium">
                    {company.name}
                  </TableCell>
                  <TableCell>{company.contact}</TableCell>
                  <TableCell>{company.website || "none"}</TableCell>
                  <TableCell>{company.country}</TableCell>
                  <TableCell>{company.phone}</TableCell>
                  <TableCell className="text-left">{company.email}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4 text-[#20bb59]" />
                        <span className="sr-only">Toggle menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => getCompanyDetail(company._id)}
                        >
                          <TvMinimal size={16} />
                          Show
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => getSingleCompany(company)}
                        >
                          <FilePenLine size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => deleteCompany(company._id)}
                        >
                          <Trash2 size={16} />
                          Delete
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
      <CompanyForm/>
    </div>
  );
};

export default Companies;
