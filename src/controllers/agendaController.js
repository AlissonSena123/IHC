// Controller responsável por intermediar as requisições HTTP e o service de agendamentos
import AgendamentoService from "../services/agendaService.js";

export default class AgendamentoController {
    // Recebe a requisição, busca todos os agendamentos via service e retorna como JSON
    static async listarAgenda(req, res) {
        try {
            const dados = await AgendamentoService.listarAgenda();
            return res.json(dados);

        } catch (error) {
            return res.status(500).json({erro: error.message});
        }
    }

    // Recebe os dados do body, envia ao service para criar o agendamento e retorna o resultado
    static async criarAgenda(req, res) {

        try {

            const agendamento = await AgendamentoService.criarAgenda(req.body);
            return res.status(201).json(agendamento);

        } catch (error) {
            return res.status(400).json({erro: error.message});
        }
    }

    // Recebe o id via URL e os novos dados via body, envia ao service para atualizar e retorna o resultado
    static async atualizarAgenda(req, res) {

        try {

            const { id } = req.params;

            const resultado =await AgendamentoService.atualizarAgenda(id, req.body);

            return res.json(resultado);

        } catch (error) {

            return res.status(400).json({erro: error.message});
        }
    }
    
    // Recebe o id via URL, envia ao service para excluir o agendamento e confirma a exclusão
    static async excluirAgenda(req, res) {

        try {

            const { id } = req.params;

            await AgendamentoService.excluir(id);

            return res.json({mensagem: "Excluído"});

        } catch (error) {

            return res.status(400).json({erro: error.message});
        }
    }
}
