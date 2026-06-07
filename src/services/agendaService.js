import AgendamentoModel from "../model/agendaModel.js";

export default class AgendamentoService {

    static async listarAgenda() {
        return await AgendamentoModel.listarAgenda();
    }

    static async criarAgenda(dados) {

        const eventos = await AgendamentoModel.listarAgenda();

        const conflito = eventos.find(evento => {
            return (
                dados.data_inicio < evento.data_fim &&
                dados.data_fim > evento.data_inicio
            );

        });

        if (conflito) {
            throw new Error("Horário já ocupado.");
        }

        return await AgendamentoModel.criarAgenda(dados);
    }

    static async atualizarAgenda(id, dados) {
        return await AgendamentoModel.atualizarAgenda(id, dados);
    }

    static async excluir(id) {
        return await AgendamentoModel.excluir(id);
    }
}
