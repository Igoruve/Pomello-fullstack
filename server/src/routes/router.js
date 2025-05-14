import { Router } from "express";
// import apiRouter from "./api/apiRouter.js";
// import viewRouter from "./views/viewRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("Hola pomello")
})


router.use("/",viewRouter);


export default router