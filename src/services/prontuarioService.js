import ProntuarioModel from "../model/prontuarioModel.js"

export default class ProntuarioService {
    static async criarProntuario(dados) {
        return await ProntuarioModel.criarProtuario(dados);
    }

    static async buscarPorPaciente(id) {
        return await ProntuarioModel.buscarPorPaciente(id);
    }
    
    static async atualizarProntuario(id, dados) {
        return await ProntuarioModel.atualizarProntuario(id, dados);
    }

    static async excluirProntuario(id) {
        return await ProntuarioModel.excluirProntuario(id);
    }

    static async criarEvolucao(dados){
        return await ProntuarioModel.criarEvolucao(dados);
    }

    static async listarEvolucoes(id){
        return await ProntuarioModel.listarEvolucao(id);
    }
}