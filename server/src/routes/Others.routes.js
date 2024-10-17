import { Router } from "express";
import { deletePeople, getPeople, getSinglePeople, postPeople, updatePeopleData } from "../controller/People.controller.js";
import { deleteCompany, getCompany, getSingleCompany, postCompany, updateCompanyData } from "../controller/Company.controller.js";
import { deleteLead, getLead, getSingleLead, leadStatusFilter, leadStatusUpdate, postLead, updateLeadData } from "../controller/Lead.controller.js";
import { getCustomer, postCustomer } from "../controller/Customer.controller.js";
import { deleteInvoices, getInvoices, getSingleInvoice, postInvoices, updateInvoice } from "../controller/Invoices.controller.js";
import { deleteExpenseCategory, getExpenseCategory, getSingleExpenseCategory, postExpenseCategory, updateExpenseCategory } from "../controller/ExpenseCategory.controller.js";
import { deleteProductCategory, getProductCategory, getSingleProductCategory, postProductCategory, updateProductCategory } from "../controller/ProductCategory.controller.js";
import { deleteExpense, getExpense, getSingleExpense, postExpense, updateExpense } from "../controller/Expense.controller.js";

const route = Router();
// ## PEOPLE
route.get("/get-people",getPeople)
route.get("/get-single-people/:id",getSinglePeople)
route.post("/post-people",postPeople)
route.delete("/delete-people/:id",deletePeople)
route.put("/update-people/:id",updatePeopleData)
// ## COMPANY
route.get("/get-company",getCompany)
route.get("/get-single-company/:id",getSingleCompany)
route.post("/post-company",postCompany)
route.delete("/delete-company/:id",deleteCompany)
route.put("/update-company/:id",updateCompanyData)
// ## LEADS
route.get("/get-lead",getLead)
route.get("/get-single-lead/:id",getSingleLead)
route.get("/get-status-lead",leadStatusFilter)
route.post("/post-lead",postLead)
route.delete("/delete-lead/:id",deleteLead)
route.put("/update-lead/:id",updateLeadData)
route.put("/update-lead-status",leadStatusUpdate)
// ## CUSTOMER
route.get("/get-customer",getCustomer)
route.post("/post-customer",postCustomer)
// ## INVOICES
route.post("/post-invoice",postInvoices)
route.get("/get-invoice",getInvoices)
route.delete('/delete-invoice/:id',deleteInvoices)
route.get('/get-single-invoice/:id',getSingleInvoice)
route.put('/update-invoice/:id',updateInvoice)
// ## EXPENSECATEGORY
route.get("/get-expensecategory",getExpenseCategory)
route.get("/get-single-expensecategory/:id",getSingleExpenseCategory)
route.post("/post-expensecategory",postExpenseCategory)
route.delete("/delete-expensecategory/:id",deleteExpenseCategory)
route.put("/update-expensecategory/:id",updateExpenseCategory)
// ## PRODUCTCATEGORY
route.get("/get-productcategory",getProductCategory)
route.get("/get-single-productcategory/:id",getSingleProductCategory)
route.post("/post-productcategory",postProductCategory)
route.delete("/delete-productcategory/:id",deleteProductCategory)
route.put("/update-productcategory/:id",updateProductCategory)

// ## EXPENSE
route.get("/get-expense",getExpense)
route.get("/get-single-expense/:id",getSingleExpense)
route.post("/post-expense",postExpense)
route.delete("/delete-expense/:id",deleteExpense)
route.put("/update-expense/:id",updateExpense)

export default route;