import { Router } from "express";
import taskController from "../controllers/taskController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", /* isLoggedInAPI, */ taskController.createTask);

router.get("/", /* isLoggedInAPI, */taskController.getTasks);

router.get("/list/:listId", /* isLoggedInAPI, */ taskController.getTasksByList);

router.get("/:id", /* isLoggedInAPI, */taskController.getTaskbyId);

router.put("/:id", /* isLoggedInAPI, */taskController.updateTask);

router.delete("/:id", /* isLoggedInAPI, */taskController.deleteTask);

export default router;