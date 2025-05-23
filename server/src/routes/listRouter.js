import { Router } from "express";
import listController from "../controllers/listController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/project/:projectId", /* isLoggedInAPI, */ listController.getListsByProject);
router.get("/",/* isLoggedInAPI, */listController.getLists);
router.get("/:id",/* isLoggedInAPI, */listController.getListById);
router.post("/",/* isLoggedInAPI, */listController.createList);
router.put("/:id",/* isLoggedInAPI, */listController.updateList);
router.delete("/:id",/* isLoggedInAPI, */listController.deleteList);

export default router