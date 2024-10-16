import React, { useContext } from "react";
import {
  FilePenLine,
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Context } from "@/context/Context";
import { Switch } from "@/components/ui/switch";
import ExpenseCategoryForm from "../components/ExpenseCategoryForm";
import ExpensiveCategoryDetailShow from "@/components/ExpensiveCategoryDetailShow";

const ExpenseCategory = () => {
  const {
    showExpenseCategoryForm,
    setShowExpenseCategoryForm,
    deleteExpenseCategory,
    storeExpenseCategory,
    getSingleExpenseCategory,
    getSingleExpenseCategoryUpdate
  } = useContext(Context);
  return (
    <div className="w-full min-h-screen bg-[#172332] justify-center flex flex-col items-center">
      <div className="w-[94%] bg-white px-10 py-10">
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
            onClick={() => setShowExpenseCategoryForm(!showExpenseCategoryForm)}
          >
            Add ExpenseCategory
          </Button>
        </div>
        <Table className={"bg-white"}>
          <TableHeader>
            <TableRow className={"bg-[#172332]"}>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="text-left">Enabled</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
  {storeExpenseCategory.map((expenses, id) => (
    <TableRow key={expenses?._id}>
      <TableCell className="font-medium">{id + 1}</TableCell>
      <TableCell className="font-medium">{expenses?.name}</TableCell>
      <TableCell className="font-medium">
        {expenses?.description}
      </TableCell>
      <TableCell className="font-medium">
        <h1
          className={`bg-[${expenses.color}] w-[65px] px-2 rounded-md py-2`}
        >
          {expenses?.color}
        </h1>
      </TableCell>
      <TableCell className="font-medium">
        <Switch
          id={`enabled-${id}`}
          checked={expenses.enabled} 
          onCheckedChange={() => {} /* No action if it's already enabled */}
          disabled={expenses.enabled} 
        />
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="flex gap-3"  onClick={() => getSingleExpenseCategory(expenses)}>
              <TvMinimal size={16} />
              Show
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-3" onClick={() => getSingleExpenseCategoryUpdate(expenses)}>
              <FilePenLine size={16} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-3" onClick={() => deleteExpenseCategory(expenses._id)}>
              <Trash2 size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </div>
      <ExpenseCategoryForm />
      <ExpensiveCategoryDetailShow/>
    </div>
  );
};

export default ExpenseCategory;
