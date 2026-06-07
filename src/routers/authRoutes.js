import { Router } from "express";
import AuthController from "../controllers/authController.js"; 

const router = Router();

/** Aqui estão os rotas que se conectam com o static da classe authController */
/** Essas rotas são relacioanas a login e cadastro */
router.post("/auth/register", AuthController.cadastro);
router.post("/auth/login", AuthController.login);

export default router;