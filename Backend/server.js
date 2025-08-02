import express from 'express';
import dbconnect from './DB/dbconnect.js';
import dotenv from "dotenv";
import cors from 'cors';
import AuthRoutes from './Routes/Auth.routes.js'
import UserRoutes from './Routes/User.routes.js'
import PlannerRoutes from "./Routes/Planner.routes.js";

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/planner", PlannerRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Listening to port at ${process.env.PORT}`);
})
dbconnect();