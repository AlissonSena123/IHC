import DashboardModel from "../model/dashboardModel.js";

export default class DashboardService {

    static async obterResumo() {
        const { pacientes, agendamentos } = await DashboardModel.buscarDados();

        const confirmadas = agendamentos.filter(item => item.status === "CONFIRMADA").length;

        const pendentes = agendamentos.filter(item => item.status === "PENDENTE").length;

        const canceladas = agendamentos.filter(item => item.status === "CANCELADA").length;

        return { totalPacientes: pacientes.length, totalAgendamentos: agendamentos.length, confirmadas, pendentes, canceladas };
    }
}