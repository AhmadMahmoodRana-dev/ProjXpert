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
import ProductForm from "@/components/ProductForm";
import ProductDetailShow from "@/components/ProductDetailShow";
import { darkBackground, lightBackground } from "@/components/Colors";

const Product = () => {
  const {
    storeProduct,
    openProductForm,
    setOpenProductForm,
    getSingleProduct,
    getSingleProductUpdate,
    deleteProduct,
    mode
  } = useContext(Context);
  return (
    <div className={`w-full min-h-screen ${mode ? darkBackground : lightBackground} justify-center flex flex-col items-center`}>
      <div className="w-[94%] rounded-sm shadow-2xl shadow-[#435349] px-10 py-10">
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
          <Button className={"flex gap-3"}>
            <RefreshCw size={16} /> Refresh
          </Button>
          <Button
            onClick={() => setOpenProductForm(!openProductForm)}
          >
            Add Product
          </Button>
        </div>
        <Table className={"bg-white"}>
          <TableHeader>
            <TableRow className={"bg-[#f7f9fb]"}>
              <TableHead className="w-[100px] text-[#2b2d3b]">Sr.No</TableHead>
              <TableHead className="text-[#2b2d3b]">Name</TableHead>
              <TableHead className="text-[#2b2d3b]">Product Category</TableHead>
              <TableHead className="text-[#2b2d3b]">Currency</TableHead>
              <TableHead className="text-[#2b2d3b]">Total</TableHead>
              <TableHead className="text-[#2b2d3b]">Description</TableHead>
              <TableHead className="text-left text-[#2b2d3b]">Ref</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {storeProduct.map((Product, id) => (
              <TableRow key={Product?._id}>
                <TableCell className="font-medium">{id + 1}</TableCell>
                <TableCell className="font-medium">{Product?.name}</TableCell>
                <TableCell className="font-medium">
                  {Product?.productCategory}
                </TableCell>
                <TableCell className="font-medium">
                  {Product?.currency}
                </TableCell>
                <TableCell className="font-medium">{Product?.total}</TableCell>
                <TableCell className="font-medium">
                  {Product?.description}
                </TableCell>
                <TableCell className="font-medium">{Product?.ref}</TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4 text-[#20bb59]" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        className="flex gap-3 text-[#20bb59]"
                        onClick={() => getSingleProduct(Product)}
                      >
                        <TvMinimal size={16} />
                        Show
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex gap-3 text-[#20bb59]"
                        onClick={() => getSingleProductUpdate(Product)}
                      >
                        <FilePenLine size={16} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex gap-3 text-[#20bb59]"
                        onClick={() => deleteProduct(Product._id)}
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
        </Table>
      </div>
      <ProductForm />
      <ProductDetailShow />
    </div>
  );
};

export default Product;
