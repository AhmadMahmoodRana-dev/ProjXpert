import { Router } from "express";
import { deletePeople, getPeople, getSinglePeople, postPeople, updatePeopleData } from "../controller/People.controller.js";

const route = Router();

route.get("/get-people",getPeople)
route.get("/get-single-people/:id",getSinglePeople)
route.post("/post-people",postPeople)
route.delete("/delete-people/:id",deletePeople)
route.put("/update-people/:id",updatePeopleData)
export default route;