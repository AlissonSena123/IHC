import { Router } from "express";
import AgendamentoController from "../controllers/agendaController.js";

const router = Router();

router.get("/api/agendamentos", AgendamentoController.listarAgenda);
router.post("/api/agendamentos",AgendamentoController.criarAgenda);
router.put("/api/agendamentos/:id",AgendamentoController.atualizarAgenda);
router.delete("/api/agendamentos/:id",AgendamentoController.excluirAgenda);

export default router;