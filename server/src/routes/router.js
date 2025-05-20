import { Router } from "express";
import listRouter from "./listRouter.js";
import authRouter from "./authRouter.js";
import projectRouter from "./projectRouter.js";
import taskRouter from "./taskRouter.js";
//import express from "express.js";
import chronoRoutes from "./chronoRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("Hola pomello")
})


router.use("/",authRouter);
router.use("/list", listRouter);
router.use("/project", projectRouter);
router.use("/task", taskRouter);
router.use("/chrono", chronoRoutes);


export default router