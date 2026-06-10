import { Router } from "express";
import FinanceiroController from "../controllers/financeiroController.js";

const router = Router();

router.post(
    "/api/criar/financeiro",
    FinanceiroController.criar
);

router.get(
    "/api/listar/financeiro",
    FinanceiroController.listar
);

router.delete(
    "/api/deletar/financeiro/:id",
    FinanceiroController.excluir
);

router.get(
    "/api/financeiro/resumo",
    FinanceiroController.resumo
);

export default router;