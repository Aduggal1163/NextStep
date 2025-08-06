import { Router } from "express";
import { requireSignIn } from "../Middlewares/auth.middleware.js";
import { allDestination, allUsers, allVendors, assignVendorsToUser, createDestination } from "../Controller/Planner.controller.js";

const router = Router();
router.post("/createDestination", requireSignIn, createDestination);
router.post("/assignVendors", requireSignIn, assignVendorsToUser);
router.get("/allDestination", requireSignIn, allDestination);
router.get("/getAllVendors", requireSignIn, allVendors);
router.get("/weddingPlanAllUsers", requireSignIn, allUsers)
export default router;