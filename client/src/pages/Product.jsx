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
import ProductForm from "@/components/ProductForm";
import ProductDetailShow from "@/components/ProductDetailShow";
import { darkBackground, darkTableColor, lightBackground } from "@/components/Colors";
import useDebounce from "@/hooks/useDebounce";

const Product = () => {
  const {
    storeProduct,
    openProductForm,
    setOpenProductForm,
    getSingleProduct,
    getSingleProductUpdate,
    deleteProduct,
    mode,
    productSearchTerm, setProductSearchTerm,user
  } = useContext(Context);

  
  const debouncedSearchTerm = useDebounce(productSearchTerm, 500);

  const filteredProductData = storeProduct.filter((product) =>
  product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  product.productCategory.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  product.currency.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  product.ref.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  return (
    <div className={`w-full min-h-screen ${mode ? darkBackground : lightBackground} justify-center flex flex-col items-center`}>
       <div className="w-full max-w-[94%] shadow-2xl shadow-[#435349] px-4 py-6 md:px-10 md:py-10 rounded-sm">
        <div className="flex flex-col md:flex-row pb-6 md:pb-10 gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
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
              onClick={() => setOpenProductForm(!openProductForm)}
            >
              Add Product
            </Button>
          )}
        </div>
                 {/* Responsive Table */}

                 <div className="overflow-x-auto  main-table w-full  ">
        <Table className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>
          <TableHeader>
            <TableRow className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>
              <TableHead className={`w-[100px] ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Sr.No</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Name</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Product Category</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Currency</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Total</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Description</TableHead>
              <TableHead className={`text-left ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Ref</TableHead>
              <TableHead className={`text-right ${mode ? darkTableColor : "text-[#2b2d3b]"}`}></TableHead>
            </TableRow>
          </TableHeader>
          {!filteredProductData.length ? (
            <TableCaption className="w-full">
              <Inbox size={40} />
              NO DATA FOUND
            </TableCaption>
          ) : (
          <TableBody>
            {filteredProductData.map((Product, id) => (
              <TableRow key={Product?._id} className={`${mode ? "border-gray-600" : "border-gray-200"}`}>
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
                      {user?.role == "client" ? null :
                      <DropdownMenuItem
                        className="flex gap-3 text-[#20bb59]"
                        onClick={() => getSingleProductUpdate(Product)}
                      >
                        <FilePenLine size={16} />
                        Edit
                      </DropdownMenuItem>
                      }
                      {user?.role == "admin" ? 
                      <DropdownMenuItem
                        className="flex gap-3 text-[#20bb59]"
                        onClick={() => deleteProduct(Product._id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </DropdownMenuItem> : null}
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
      <ProductForm />
      <ProductDetailShow />
    </div>
  );
};

export default Product;
