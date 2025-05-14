import { Router } from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", isLoggedInAPI,createTask);

router.get("/", isLoggedInAPI,getTasks);

router.get("/:id", isLoggedInAPI,getTaskById);

router.put("/:id", isLoggedInAPI,updateTask);

router.delete("/:id", isLoggedInAPI,deleteTask);

export default router;