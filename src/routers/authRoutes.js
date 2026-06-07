import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = Router();

router.post("/auth/register", AuthController.cadastro);
router.post("/auth/login", AuthController.login);

export default router;