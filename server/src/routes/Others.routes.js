import { Router } from "express";
import { deletePeople, getPeople, getSinglePeople, postPeople, updatePeopleData } from "../controller/People.controller.js";
import { deleteCompany, getCompany, getSingleCompany, postCompany, updateCompanyData } from "../controller/Company.controller.js";
import { deleteLead, getLead, getSingleLead, leadStatusFilter, leadStatusUpdate, postLead, updateLeadData } from "../controller/Lead.controller.js";

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
export default route;