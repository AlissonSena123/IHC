import DashboardService from "../services/dashboardService.js";

export default class DashboardController {

    static async resumo(req, res) {

        try {

            const dados = await DashboardService.obterResumo();
            res.status(200).json(dados);

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro:"Erro ao carregar dashboard."});
        }
    }
}