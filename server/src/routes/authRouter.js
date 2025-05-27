import {Router} from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/login",authController.login);
router.post("/register",authController.register);
router.get("/users",authController.getUsers);
router.get("/users/:id",authController.getUserById);
router.put("/users/:id",authController.updateUser);
router.delete("/users/:id",authController.deleteUser);

export default router