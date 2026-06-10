import { Router } from "express";
import AgendamentoController from "../controllers/agendaController.js";

const router = Router();

/** Aqui estão os rotas que se conectam com o static da classe AgendamentoController */
/** São essas rotas que iremos chamar quando fazermos o fetch nos arquivos JS */
/** Basicamente é dentro da pasta de routers onde fazemos o CRUD */
/** Tudo relacionado a agendamentos fica aqui */
router.get("/api/listar/agendamentos", AgendamentoController.listarAgenda);
router.post("/api/criar/agendamentos", AgendamentoController.criarAgenda);
router.put("/api/atualizar/agendamentos/:id", AgendamentoController.atualizarAgenda);
router.get("/api/qtd/agendamentos", AgendamentoController.listarQuantidadeDeAgendas);
router.delete("/api/deletar/agendamentos/:id", AgendamentoController.excluirAgenda);
router.get("/api/agendamentos/recentes", AgendamentoController.agendamentosRecentes);
export default router;