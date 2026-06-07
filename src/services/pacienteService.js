import PacienteModel from "../model/pacienteModel";

export default class PacienteService {
    static async cadastro(dados){
        if(!dados.nome || !dados.email){
            throw new Error("Preencha todos os campos")
        }

        return await PacienteModel.cadastrarPaciente(dados)
    }

    static async lista(){
        return await PacienteModel.listarPacientes();
    }
}