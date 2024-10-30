import { Router } from "express";
import { deletePeople, getPeople, getSinglePeople, postPeople, updatePeopleData } from "../controller/People.controller.js";
import { deleteCompany, getCompany, getSingleCompany, postCompany, updateCompanyData } from "../controller/Company.controller.js";
import { deleteLead, getLead, getSingleLead, leadStatusFilter, leadStatusUpdate, postLead, updateLeadData } from "../controller/Lead.controller.js";
import { deleteCustomer, getCustomer, getSingleCustomerName, postCustomer } from "../controller/Customer.controller.js";
import { deleteInvoices, getInvoices, getSingleInvoice,  postInvoices, updateInvoice } from "../controller/Invoices.controller.js";
import { deleteExpenseCategory, getExpenseCategory, getSingleExpenseCategory, postExpenseCategory, updateExpenseCategory } from "../controller/ExpenseCategory.controller.js";
import { deleteProductCategory, getProductCategory, getSingleProductCategory, postProductCategory, updateProductCategory } from "../controller/ProductCategory.controller.js";
import { deleteExpense, getExpense, getSingleExpense, postExpense, updateExpense } from "../controller/Expense.controller.js";
import { deleteProduct, getProduct, getSingleProduct, postProduct, updateProduct } from "../controller/Product.controller.js";
import { deleteQuoteLeads, getQuoteLeads, getSingleQuoteLead, postQuoteLead, updateQuoteLead } from "../controller/QuoteLead.controller.js";

// ## AUTH
import { register,login, getAllUsers, deleteUser } from "../controller/Auth.controller.js";
import authMiddleware from "../middlewares/auth.js";


const route = Router();
// ## PEOPLE
route.get("/get-people",authMiddleware(['admin','worker',"client"]),getPeople)
route.get("/get-single-people/:id",authMiddleware(['admin','worker',"client"]),getSinglePeople)
route.post("/post-people",authMiddleware(['admin','worker']),postPeople)
route.put("/update-people/:id",authMiddleware(['admin','worker']),updatePeopleData)
route.delete("/delete-people/:id",authMiddleware(['admin']),deletePeople)
// ## COMPANY
route.get("/get-company",authMiddleware(['admin','worker',"client"]),getCompany)
route.get("/get-single-company/:id",authMiddleware(['admin','worker',"client"]),getSingleCompany)
route.post("/post-company",authMiddleware(['admin','worker']),postCompany)
route.put("/update-company/:id",authMiddleware(['admin','worker']),updateCompanyData)
route.delete("/delete-company/:id",authMiddleware(['admin']),deleteCompany)
// ## LEADS
route.get("/get-lead",authMiddleware(['admin','worker',"client"]),getLead)
route.get("/get-single-lead/:id",authMiddleware(['admin','worker',"client"]),getSingleLead)
route.get("/get-status-lead",authMiddleware(['admin','worker',"client"]),leadStatusFilter)
route.post("/post-lead",authMiddleware(['admin','worker']),postLead)
route.put("/update-lead/:id",authMiddleware(['admin','worker',]),updateLeadData)
route.put("/update-lead-status",authMiddleware(['admin','worker',]),leadStatusUpdate)
route.delete("/delete-lead/:id",authMiddleware(['admin']),deleteLead)
// ## CUSTOMER
route.get("/get-customer",authMiddleware(['admin','worker',"client"]),getCustomer)
route.get("/get-customer/:name",authMiddleware(['admin','worker',"client"]),getSingleCustomerName)
route.post("/post-customer",authMiddleware(['admin','worker']),postCustomer)
route.delete("/delete-customer/:id",authMiddleware(['admin']),deleteCustomer)
// ## INVOICES
route.get("/get-invoice",authMiddleware(['admin','worker',"client"]),getInvoices)
route.get('/get-single-invoice/:id',authMiddleware(['admin','worker',"client"]),getSingleInvoice)
route.post("/post-invoice",authMiddleware(['admin','worker']),postInvoices)
route.put('/update-invoice/:id',authMiddleware(['admin','worker']),updateInvoice)
route.delete('/delete-invoice/:id',authMiddleware(['admin']),deleteInvoices)
// ## EXPENSECATEGORY
route.get("/get-expensecategory",authMiddleware(['admin','worker',"client"]),getExpenseCategory)
route.get("/get-single-expensecategory/:id",authMiddleware(['admin','worker',"client"]),getSingleExpenseCategory)
route.post("/post-expensecategory",authMiddleware(['admin','worker']),postExpenseCategory)
route.put("/update-expensecategory/:id",authMiddleware(['admin','worker']),updateExpenseCategory)
route.delete("/delete-expensecategory/:id",authMiddleware(['admin']),deleteExpenseCategory)
// ## PRODUCTCATEGORY
route.get("/get-productcategory",authMiddleware(['admin','worker',"client"]),getProductCategory)
route.get("/get-single-productcategory/:id",authMiddleware(['admin','worker',"client"]),getSingleProductCategory)
route.post("/post-productcategory",authMiddleware(['admin','worker']),postProductCategory)
route.put("/update-productcategory/:id",authMiddleware(['admin','worker']),updateProductCategory)
route.delete("/delete-productcategory/:id",authMiddleware(['admin']),deleteProductCategory)

// ## EXPENSE
route.get("/get-expense",authMiddleware(['admin','worker',"client"]),getExpense)
route.get("/get-single-expense/:id",authMiddleware(['admin','worker',"client"]),getSingleExpense)
route.post("/post-expense",authMiddleware(['admin','worker']),postExpense)
route.put("/update-expense/:id",authMiddleware(['admin','worker']),updateExpense)
route.delete("/delete-expense/:id",authMiddleware(['admin']),deleteExpense)

// ## PRODUCT
route.get("/get-product",authMiddleware(['admin','worker',"client"]),getProduct)
route.get("/get-single-product/:id",authMiddleware(['admin','worker',"client"]),getSingleProduct)
route.post("/post-product",authMiddleware(['admin','worker']),postProduct)
route.put("/update-product/:id",authMiddleware(['admin','worker']),updateProduct)
route.delete("/delete-product/:id",authMiddleware(['admin']),deleteProduct)

// ## QUOTES FOR LEAD
route.post("/post-quote-lead",authMiddleware(['admin','worker']),postQuoteLead)
route.get("/get-quote-lead",authMiddleware(['admin','worker',"client"]),getQuoteLeads)
route.delete("/delete-lead-quotes/:id",authMiddleware(['admin']),deleteQuoteLeads)
route.get('/get-single-quote-lead/:id',authMiddleware(['admin','worker',"client"]),getSingleQuoteLead)
route.put('/update-quote-lead/:id',authMiddleware(['admin','worker']),updateQuoteLead)


// ### AUTHENTICATION AND AUTHERIZATION #####


route.post("/register", register);
route.post("/login", login);
route.get("/get-users",getAllUsers)
route.delete("/delete-user/:id",deleteUser)






export default route;