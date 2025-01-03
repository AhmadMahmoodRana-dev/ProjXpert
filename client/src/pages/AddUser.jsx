import React, { useContext, useState } from "react";
import { Inbox, RefreshCw, Search, Trash2 } from "lucide-react";
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
import PeopleForm from "@/components/PeopleForm";
import DetailShow from "@/components/DetailShow";
import useDebounce from "@/hooks/useDebounce";
import {
  darkBackground,
  darkTableColor,
  lightBackground,
} from "@/components/Colors";
import UserForm from "@/components/UserForm";

const AddUser = () => {
  const { mode, user, allUser, setOpenUserForm, deleteUser } =
    useContext(Context);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredData = allUser.filter(
    (user) =>
      user.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() => setOpenUserForm(true)}
            >
              Add User
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
                <TableHead
                  className={`w-[100px] ${
                    mode ? darkTableColor : "text-[#2b2d3b]"
                  }`}
                >
                  Sr.No
                </TableHead>
                <TableHead
                  className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}
                >
                  UserName
                </TableHead>
                <TableHead
                  className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}
                >
                  Email
                </TableHead>
                <TableHead
                  className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}
                >
                  Role
                </TableHead>
                <TableHead
                  className={`text-left ${
                    mode ? darkTableColor : "text-[#2b2d3b]"
                  }`}
                ></TableHead>
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
                  <TableRow
                    key={user._id}
                    className={`${
                      mode ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
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
      </div>
      <PeopleForm />
      <UserForm />
      <DetailShow />
    </div>
  );
};

export default AddUser;
