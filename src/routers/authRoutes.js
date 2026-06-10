import { Router } from "express";
import AuthController from "../controllers/authController.js"; 
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

/** Aqui estão os rotas que se conectam com o static da classe authController */
/** Essas rotas são relacioanas a login e cadastro */
router.post("/auth/register", AuthController.cadastro);
router.post("/auth/login", AuthController.login);
router.get("/auth/me", authMiddleware, AuthController.me);
router.post("/auth/logout", AuthController.logout);
export default router;