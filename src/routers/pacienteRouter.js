import { Router } from "express";
import PacienteController from "../controllers/pacienteController.js"

const router = Router();

router.get("/listar/pacientes", PacienteController.listarPacientes);
router.post("/cadastrar/paciente", PacienteController.cadastrarPacientes);
router.get("/qtd/pacientes", PacienteController.listarQuantidadeDePacientes);
router.delete("/deletar/paciente/:id", PacienteController.deletarPaciente);

export default router;