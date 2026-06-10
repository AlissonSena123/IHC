import FinanceiroService from "../services/financeiroService.js";

export default class FinanceiroController {

    static async criarFinanceiro(req, res) {

        try {
            const resultado = await FinanceiroService.criarFinanceiro(req.body);
            res.status(201).json(resultado);

        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }

    static async listarFinanceiro(req, res) {

        try {
            const resultado = await FinanceiroService.listarFinanceiro();
            res.json(resultado);
        } catch (error) {
            res.status(500).json({erro: error.message});
        }
    }

    static async excluirFinanceiro(req, res) {
        try {
            await FinanceiroService.excluirFinanceiro(req.params.id);
            res.json({mensagem: "Registro removido."});
        } catch (error) {
            res.status(500).json({
                erro: error.message
            });
        }
    }

    static async resumo(req, res) {
        try {
            const resumo = await FinanceiroService.resumoMensal();
            res.json(resumo);
        } catch (error) {
            res.status(500).json({
                erro: error.message
            });
        }
    }
}