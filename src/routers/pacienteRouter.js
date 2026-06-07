import { Router } from "express";
import PacienteController from "../controllers/pacienteController"

const router = Router();

router.get("/pacientes", PacienteController.listarPacientes);
router.post("/pacientes", PacienteController.cadastrarPacientes)

export default router;