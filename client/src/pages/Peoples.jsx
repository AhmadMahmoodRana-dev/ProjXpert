import React, { useContext } from "react";
// import Image from "next/image"
// import Link from "react-router-dom"
import { RefreshCw, Search, UserRound } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
const Peoples = () => {
  const { setOpenPersonForm, storePeopleData } = useContext(Context);
  return (
    <div className="w-full min-h-screen bg-[#172332] justify-center flex flex-col items-center">
      <div className="w-[94%] bg-white px-10 py-10">
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
                  {/* <Link href="#">Orders</Link> */}
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
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Button className={"bg-[#172332] flex gap-3"}>
            <RefreshCw size={16} /> Refresh
          </Button>
          <Button
            className={"bg-[#172332]"}
            onClick={() => setOpenPersonForm(true)}
          >
            Add New Person
          </Button>
        </div>
        <Table className={"bg-white"}>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className={"bg-[#172332]"}>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Firstname</TableHead>
              <TableHead>Lastname</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storePeopleData.map((people,id) => (
              <TableRow key={people._id}>
                <TableCell className="font-medium">
                  {id + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {people.firstName}
                </TableCell>
                <TableCell>{people.lastName}</TableCell>
                <TableCell>{people.company || "none" }</TableCell>
                <TableCell>{people.country}</TableCell>
                <TableCell>{people.phone}</TableCell>
                <TableCell className="text-right">
                  {people.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Peoples;
