// src/routers/prontuarioRouter.js

import { Router } from "express";
import ProntuarioController from "../controllers/prontuarioController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // ← adiciona
import authorize from "../middlewares/roleMiddleware.js";      // ← adiciona

const router = Router();

// Somente psicólogo autenticado pode criar, editar e excluir
router.post("/api/criar/prontuarios",
    authMiddleware,
    authorize(["psicologo"]),
    ProntuarioController.criarProntuario
);

router.put("/api/atualizar/prontuarios/:id",
    authMiddleware,
    authorize(["psicologo"]),
    ProntuarioController.atualizarProntuario
);

router.delete("/api/deletar/prontuarios/:id",
    authMiddleware,
    authorize(["psicologo"]),
    ProntuarioController.excluirProntuario
);

router.get("/api/qtd/prontuario", ProntuarioController.qtdProntuario);

// Buscar e listar também exigem autenticação
router.get("/api/buscar/paciente/:id",
    authMiddleware,
    authorize(["psicologo"]),
    ProntuarioController.buscarPorPaciente
);

router.post("/api/criar/evolucoes",
    authMiddleware,
    authorize(["psicologo"]),
    ProntuarioController.criarEvolucao
);

router.get("/api/listar/evolucoes/:id",
    authMiddleware,
    authorize(["psicologo"]),
    ProntuarioController.listarEvolucoes
);


export default router;