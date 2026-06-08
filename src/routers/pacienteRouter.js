import { Router } from "express";
import PacienteController from "../controllers/pacienteController.js"

const router = Router();

/** Aqui estão os rotas que se conectam com o static da classe pacienteController */
/** São essas rotas que iremos chamar quando fazermos o fetch nos arquivos JS */
/** Tudo relacionado a pacientes fica aqui */
router.get("/api/listar/pacientes", PacienteController.listarPacientes);
router.post("/api/cadastrar/paciente", PacienteController.cadastrarPacientes);
router.get("/api/qtd/pacientes", PacienteController.listarQuantidadeDePacientes);
router.delete("/api/deletar/paciente/:id", PacienteController.deletarPaciente);

export default router;