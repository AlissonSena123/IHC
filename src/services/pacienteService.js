import PacienteModel from "../model/pacienteModel.js";

export default class PacienteService {
    static async cadastro(dados) {
        if (!dados.nome || !dados.email || !dados.telefone) {
            throw new Error("Preencha todos os campos");
        }

        return await PacienteModel.cadastrarPaciente(dados)
    }

    static async lista() {
        return await PacienteModel.listarPacientes();
    }

    static async quantPaciente() {
        return await PacienteModel.listarQuantidadePacientes();
    }

    static async deletar(id) {
        return await PacienteModel.deletarPaciente(id);
    }
}