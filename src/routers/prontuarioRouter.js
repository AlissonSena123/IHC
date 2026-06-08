import { Router } from "express";
import ProntuarioController from "../controllers/prontuarioController.js";

const router = Router();

router.post("/api/criar/prontuarios", ProntuarioController.criarProntuario);
router.get("/api/buscar/paciente/:id", ProntuarioController.buscarPorPaciente);
router.put("/api/atualizar/prontuarios/:id", ProntuarioController.atualizarProntuario);
router.delete("/api/deletar/prontuarios/:id", ProntuarioController.excluirProntuario)
router.post("/api/criar/evolucoes", ProntuarioController.criarEvolucao);
router.get("/api/listar/evolucoes/:id", ProntuarioController.listarEvolucoes);

export default router;