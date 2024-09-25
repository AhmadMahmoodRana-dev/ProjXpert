import { Router } from "express";
import { getPeople, postPeople } from "../controller/People.controller.js";

const route = Router();

route.get("/",getPeople)
route.post("/",postPeople)
export default route;