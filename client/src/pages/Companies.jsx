import React, { useContext } from "react";
import {
  FilePenLine,
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
import CompanyForm from "@/components/CompanyForm";
import useDebounce from "@/hooks/useDebounce";
import { darkBackground, darkTableColor, lightBackground } from "@/components/Colors";

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
    user,
  } = useContext(Context);

  const debouncedSearchTerm = useDebounce(cmpSearchTerm, 500);

  const filteredCompanyData = storeCompanyData.filter(
    (company) =>
      company.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      company.country
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      company.contact.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div
      className={`w-full min-h-screen ${
        mode ? darkBackground : lightBackground
      } justify-center flex flex-col items-center`}
    >
       <div className="w-full max-w-[94%] shadow-2xl shadow-[#435349] px-4 py-6 md:px-10 md:py-10 rounded-sm">
        <div className="flex flex-col md:flex-row pb-6 md:pb-10 gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={cmpSearchTerm}
              onChange={(e) => setCmpSearchTerm(e.target.value)}
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
              onClick={() => setOpenCompanyForm(true)}
            >
              Add Companies
            </Button>
          )}
        </div>
        {/* Responsive Table */}

        <div className="overflow-x-auto  main-table w-full  ">
        <Table className={`${mode ? darkTableColor : "bg-white"}`}>
          <TableHeader>
            <TableRow className={`${mode ? "bg-[#1d222b]" : "bg-[#f7f9fb]" }`}>
              <TableHead className={`w-[100px] ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Sr.No</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Name</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Contact</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>website</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Country</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Phone</TableHead>
              <TableHead className={`text-left ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Email</TableHead>
              <TableHead className={`text-right ${mode ? darkTableColor : "text-[#2b2d3b]"}`}></TableHead>
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
                <TableRow key={company._id} className={`${mode ? "border-gray-600" : "border-gray-200"}`}>
                  <TableCell className="font-medium">{id + 1}</TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
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

                        {user?.role == "client" ? null : (
                          <DropdownMenuItem
                            className="flex gap-3 text-[#20bb59]"
                            onClick={() => getSingleCompany(company)}
                          >
                            <FilePenLine size={16} />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {user?.role == "admin" ? (
                          <DropdownMenuItem
                            className="flex gap-3 text-[#20bb59]"
                            onClick={() => deleteCompany(company._id)}
                          >
                            <Trash2 size={16} />
                            Delete
                          </DropdownMenuItem>
                        ) : null}
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
      <CompanyForm />
    </div>
  );
};

export default Companies;
