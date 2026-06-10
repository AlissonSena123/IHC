import ProntuarioModel from "../model/prontuarioModel.js"

export default class ProntuarioService {
    static async criarProntuario(dados) {
        // 1. Verifica se o paciente já tem prontuário
        const existente = await ProntuarioModel.buscarPorPaciente(dados.paciente_id);

        if (existente) {
            throw new Error("Este paciente já possui um prontuário cadastrado");
        }

        // 2. Se não tem, cria normalmente
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

    static async criarEvolucao(dados) {
        return await ProntuarioModel.criarEvolucao(dados);
    }

    static async listarEvolucoes(id) {
        return await ProntuarioModel.listarEvolucao(id);
    }

    static async ListarQuantidadeProntuario(){
        return await ProntuarioModel.qtdProntuario();
    }
}