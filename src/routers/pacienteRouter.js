import { Router } from "express";
import PacienteController from "../controllers/pacienteController.js"

const router = Router();

/** Aqui estão os rotas que se conectam com o static da classe pacienteController */
/** São essas rotas que iremos chamar quando fazermos o fetch nos arquivos JS */
/** Tudo relacionado a pacientes fica aqui */
router.get("/listar/pacientes", PacienteController.listarPacientes);
router.post("/cadastrar/paciente", PacienteController.cadastrarPacientes);
router.get("/qtd/pacientes", PacienteController.listarQuantidadeDePacientes);
router.delete("/deletar/paciente/:id", PacienteController.deletarPaciente);

export default router;