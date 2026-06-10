import FinanceiroModel from "../model/financeiroModel.js";

export default class FinanceiroService {

    static async criarFinanceiro(dados) {

        if (!dados.descricao) {
            throw new Error("Descrição obrigatória.");
        }

        if (!dados.valor) {
            throw new Error("Valor obrigatório.");
        }

        return await FinanceiroModel.criarFinanceiro(dados);
    }

    static async listarFinanceiro() {

        return await FinanceiroModel.listarFinanceiro();
    }

    static async excluirFinanceiro(id) {

        return await FinanceiroModel.excluirFinanceiro(id);
    }

    static async resumoMensal() {

        const dados =
            await FinanceiroModel.resumoMensal();

        let receitas = 0;
        let despesas = 0;

        dados.forEach(item => {

            if (item.tipo === "RECEITA") {
                receitas += Number(item.valor);
            } else {
                despesas += Number(item.valor);
            }
        });

        return { receitas, despesas, lucro: receitas - despesas };
    }
}