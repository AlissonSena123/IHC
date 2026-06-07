import AgendamentoService from "../services/agendaService.js";

export default class AgendamentoController {

    static async listarAgenda(req, res) {
        try {
            const dados = await AgendamentoService.listarAgenda();
            return res.json(dados);

        } catch (error) {
            return res.status(500).json({erro: error.message});
        }
    }

    static async criarAgenda(req, res) {

        try {

            const agendamento = await AgendamentoService.criarAgenda(req.body);
            return res.status(201).json(agendamento);

        } catch (error) {
            return res.status(400).json({erro: error.message});
        }
    }

    static async atualizarAgenda(req, res) {

        try {

            const { id } = req.params;

            const resultado =await AgendamentoService.atualizarAgenda(id, req.body);

            return res.json(resultado);

        } catch (error) {

            return res.status(400).json({erro: error.message});
        }
    }

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
