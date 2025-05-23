import { Router } from "express";
import projectController from "../controllers/projectController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", isLoggedInAPI, projectController.createProject);

router.get(
  "/user/",
  isLoggedInAPI, projectController.getProjectsByUser
);

router.get("/", isLoggedInAPI, projectController.getProjects);

router.get("/:id", isLoggedInAPI, projectController.getProjectbyId);

router.put("/:id", isLoggedInAPI, projectController.updateProject);

router.delete("/:id", isLoggedInAPI, projectController.deleteProject);

router.get(
  "/full/:userId",
   isLoggedInAPI, projectController.getFullUserData
);

export default router;
