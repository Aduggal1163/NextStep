import {Router} from "express";
import { SignupController,SigninController } from "../Controller/Auth.controller.js";
const router= Router();
router.post("/signup",SignupController);
router.post("/signin",SigninController);
export default router;
