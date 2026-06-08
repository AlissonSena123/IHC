// Service responsável pelas regras de negócio dos agendamentos
import AgendamentoModel from "../model/agendaModel.js";

export default class AgendamentoService {

    // Repassa a requisição ao model para buscar todos os agendamentos
    static async listarAgenda() {
        return await AgendamentoModel.listarAgenda();
    }

    // Valida se o horário está disponível antes de criar o agendamento
    static async criarAgenda(dados) {

        // Busca todos os agendamentos existentes para verificar conflito de horário
        const eventos = await AgendamentoModel.listarAgenda();

        // Verifica se já existe um agendamento no mesmo intervalo de tempo
        const conflito = eventos.find(evento => {
            return (dados.horario_inicio < evento.horario_fim && dados.horario_fim > evento.horario_inicio && evento.status !== "CANCELADA");
        });

        // Se houver conflito, lança erro impedindo a criação
        if (conflito) {
            throw new Error("Horário indisponível");
        }

        return await AgendamentoModel.criarAgenda(dados);
    }

    // Repassa o id e os novos dados ao model para atualizar o agendamento
    static async atualizarAgenda(id, dados) {
        return await AgendamentoModel.atualizarAgenda(id, dados);
    }

    // Repassa o id ao model para excluir o agendamento
    static async excluir(id) {
        return await AgendamentoModel.excluir(id);
    }
}