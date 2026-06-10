import PacienteModel from "./pacienteModel.js";
import AgendaModel from "./agendaModel.js";

export default class DashboardModel {

    static async buscarDados() {

        const pacientes = await PacienteModel.listarPacientes();
        const agendamentos = await AgendaModel.listarAgenda();

        return {pacientes,agendamentos};
    }
}