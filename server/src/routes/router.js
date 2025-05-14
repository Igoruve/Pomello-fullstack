import { Router } from "express";
import listRouter from "./listRouter.js";
import authRouter from "./authRouter.js";
import projectRouter from "./projectRouter.js";
import taskRouter from "./taskRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("Hola pomello")
})


router.use("/",authRouter);
router.use("/list", listRouter);
router.use("/project", projectRouter);
router.use("/task", taskRouter);


export default router
