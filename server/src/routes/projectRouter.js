import { Router } from "express";
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";



const router = Router();

router.post("/", isLoggedInAPI,createProject);

router.get("/",isLoggedInAPI, getProjects);

router.get("/:id", isLoggedInAPI,getProjectById);

router.put("/:id",isLoggedInAPI, updateProject);

router.delete("/:id",isLoggedInAPI, deleteProject);

export default router;