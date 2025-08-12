import { Router } from "express";
import {
  getAllPlanners,
  getAllVendors,
  guestDetails,
  getProfile,
  updateProfile,
  createWeddingPlan,
  removePlanner,
  assignPlannerAndUpdate,
} from "../Controller/User.controller.js";
import { requireSignIn } from "../Middlewares/auth.middleware.js";
const router = Router();
router.post("/getProfile", requireSignIn, getProfile);
router.post("/updateProfile", requireSignIn, updateProfile);
router.post("/submitGuestDetails", requireSignIn, guestDetails);
router.post("/createWeddingPlan", requireSignIn, createWeddingPlan);
router.get("/assignPlanner/:id", requireSignIn, assignPlannerAndUpdate);
router.get("/removePlanner/:id", requireSignIn, removePlanner);
router.get("/allVendors", requireSignIn, getAllVendors);
router.get("/allPlanner", requireSignIn, getAllPlanners);
export default router;
