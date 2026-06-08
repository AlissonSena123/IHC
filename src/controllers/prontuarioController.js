import ProntuarioService from "../services/prontuarioService.js";

export default class ProntuarioController {
    static async criarProntuario(req, res) {
        try {
            const prontuario = await ProntuarioService.criarProntuario(req.body)
            res.status(201).json(prontuario);
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    static async buscarPorPaciente(req, res) {
        try {
            const prontuario = await ProntuarioService.buscarPorPaciente(req.params.id);

            res.json(prontuario);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async atualizarProntuario(req, res) {
        try {
            const prontuario = await ProntuarioService.atualizarProntuario(req.params.id, req.body);

            res.json(prontuario);
        } catch (error) {
            res.status(500).json({erro: error.message});
        }
    }

    static async excluirProntuario(req, res) {
        try {
            await ProntuarioService.excluirProntuario(req.params.id);
            res.json({mensagem: "Prontuário removido com sucesso"});
        } catch (error) {
            res.status(500).json({erro: error.message});
        }
    }

    static async criarEvolucao(req, res){
        try {
            const evolucao = await ProntuarioService.criarEvolucao(req.body);
            res.status(201).json(evolucao);
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }

    static async listarEvolucoes(req, res){
        try {
            const evolucoes = await ProntuarioService.listarEvolucoes(req.params.id);
            res.json(evolucoes);
        } catch (error) {
            res.status(500).json({erro: error.message});
        }
    }
}