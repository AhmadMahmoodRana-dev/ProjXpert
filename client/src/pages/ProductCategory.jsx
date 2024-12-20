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
import { Switch } from "@/components/ui/switch";
import ProductCategoryForm from "@/components/ProductCategoryForm";
import ProductCategoryDetail from "@/components/ProductCategoryDetail";
import { darkBackground, darkTableColor, lightBackground } from "@/components/Colors";
import useDebounce from "@/hooks/useDebounce";

const ProductCategory = () => {
  const {
    showProductCategoryForm,
    setShowProductCategoryForm,
    deleteProductCategory,
    storeProductCategory,
    getSingleProductCategory,
    getSingleProductCategoryUpdate,
    mode,
    productCategorySearchTerm, setProductCategorySearchTerm,
    user
  } = useContext(Context);

  const debouncedSearchTerm = useDebounce(productCategorySearchTerm, 500);

  const filteredProductData = storeProductCategory.filter((product) =>
  product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())||
  product.color.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );


  return (
    <div className={`w-full min-h-screen ${mode ? darkBackground : lightBackground} justify-center flex flex-col items-center`}>
    <div className="w-full max-w-[94%] shadow-2xl shadow-[#435349] px-4 py-6 md:px-10 md:py-10 rounded-sm">
        <div className="flex flex-col md:flex-row pb-6 md:pb-10 gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={productCategorySearchTerm}
              onChange={(e) => setProductCategorySearchTerm(e.target.value)}
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
              onClick={() => setShowProductCategoryForm(!showProductCategoryForm)}
            >
              Add ProductCategory
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
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Description</TableHead>
              <TableHead className={`${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Color</TableHead>
              <TableHead className={`text-left ${mode ? darkTableColor : "text-[#2b2d3b]"}`}>Enabled</TableHead>
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
            {filteredProductData.map((product, id) => (
              <TableRow key={product?._id} className={`${mode ? "border-gray-600" : "border-gray-200"}`}>
                <TableCell className="font-medium">{id + 1}</TableCell>
                <TableCell className="font-medium">{product?.name}</TableCell>
                <TableCell className="font-medium">
                  {product?.description}
                </TableCell>
                <TableCell className="font-medium">
                  <h1
                    className={`bg-[${product.color}] w-[65px] px-2 rounded-md py-2`}
                  >
                    {product?.color}
                  </h1>
                </TableCell>
                <TableCell className="font-medium">
                  <Switch
                    id={`enabled-${id}`}
                    checked={product.enabled}
                    onCheckedChange={
                      () => {} /* No action if it's already enabled */
                    }
                    disabled={product.enabled}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        className="flex gap-3"
                        onClick={() => getSingleProductCategory(product)}
                      >
                        <TvMinimal size={16} />
                        Show
                      </DropdownMenuItem>
                      {user?.role == "client" ? null :
                      <DropdownMenuItem
                        className="flex gap-3"
                        onClick={() => getSingleProductCategoryUpdate(product)}
                      >
                        <FilePenLine size={16} />
                        Edit
                      </DropdownMenuItem>
                      }
                      {user?.role == "admin" ? 
                      <DropdownMenuItem
                        className="flex gap-3"
                        onClick={() => deleteProductCategory(product._id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </DropdownMenuItem>: null}
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
      <ProductCategoryForm />
      <ProductCategoryDetail />
    </div>
  );
};

export default ProductCategory;
