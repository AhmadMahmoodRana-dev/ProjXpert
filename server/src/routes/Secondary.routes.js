import { Router } from "express";
import route from "./Others.routes.js";

const router = Router();

router.use("/form",route)

export default router;

