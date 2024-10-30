import React, { useContext, useState } from "react";
import {
  Inbox,
  RefreshCw,
  Search,
  Trash2,
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
import PeopleForm from "@/components/PeopleForm";
import DetailShow from "@/components/DetailShow";
import useDebounce from "@/hooks/useDebounce";
import { darkBackground, lightBackground } from "@/components/Colors";
import UserForm from "@/components/UserForm";

const AddUser = () => {
  const { mode, user, allUser, setOpenUserForm, deleteUser } =
    useContext(Context);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredData = allUser.filter(
    (user) =>
      user.username
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
     
      user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div
      className={`w-full min-h-screen ${
        mode ? darkBackground : lightBackground
      } justify-center flex flex-col items-center`}
    >
      <div className="w-[94%] px-10 py-10  shadow-2xl shadow-[#435349] rounded-sm">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Button className={" flex gap-3"}>
            <RefreshCw size={16} /> Refresh
          </Button>
          {user.role == "client" ? null : (
            <Button onClick={() => setOpenUserForm(true)}>Add Person</Button>
          )}
        </div>
        <Table className={"bg-white"}>
          <TableHeader>
            <TableRow className={"bg-[#f7f9fb]"}>
              <TableHead className="w-[100px] text-[#2b2d3b]">Sr.No</TableHead>
              <TableHead className="text-[#2b2d3b]">UserName</TableHead>
              <TableHead className="text-[#2b2d3b]">Email</TableHead>
              <TableHead className="text-[#2b2d3b]">Role</TableHead>
              <TableHead className="text-right text-[#2b2d3b]"></TableHead>
            </TableRow>
          </TableHeader>
          {!filteredData.length ? (
            <TableCaption className="w-full">
              <Inbox size={40} />
              NO DATA FOUND
            </TableCaption>
          ) : (
            <TableBody>
              {filteredData.map((user, id) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{id + 1}</TableCell>
                  <TableCell className="font-medium">
                    {user?.username}
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role || "none"}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4 text-[#20bb59]" />
                        <span className="sr-only">Toggle menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          className="flex gap-3 text-[#20bb59]"
                          onClick={() => deleteUser(user?._id)}
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
      <PeopleForm />
      <UserForm />
      <DetailShow />
    </div>
  );
};

export default AddUser;
