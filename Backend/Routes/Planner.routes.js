import { Router } from "express";
import { requireSignIn } from "../Middlewares/auth.middleware.js";
import { allDestination, createDestination } from "../Controller/Planner.controller.js";

const router = Router();
router.post("/createDestination", requireSignIn, createDestination);
router.get("/allDestination", requireSignIn, allDestination);
export default router;