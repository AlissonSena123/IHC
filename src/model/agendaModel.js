// Model responsável por realizar as operações no banco de dados para a entidade Agendamento

import { supabase } from "../config/supabase.js";

export default class AgendamentoModel {

    // Busca todos os agendamentos, incluindo o nome do paciente e do psicólogo relacionados
    static async listarAgenda() {
        const { data, error } = await supabase
            .from("agendamentos")
            .select(`*, paciente(nome, sobrenome)`)
            .order("data_sessao");

        if (error) throw error;

        return data;
    }

    // Busca um agendamento específico pela data
    static async buscarPorData(dataSessao) {
        const { data, error } = await supabase
            .from("agendamentos")
            .select("*")
            .eq("data_sessao", dataSessao);

        if (error) throw error;

        return data;
    }

    // Insere um novo agendamento no banco e retorna o registro criado
    static async criarAgenda(dados) {
        const { data, error } = await supabase
            .from("agendamentos")
            .insert(dados)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    // Atualiza os dados de um agendamento existente pelo id e retorna o registro atualizado
    static async atualizarAgenda(id, dados) {
        const { data, error } = await supabase
            .from("agendamentos")
            .update(dados)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    // Remove um agendamento do banco pelo id
    static async excluirAgenda(id) {
        const { error } = await supabase
            .from("agendamentos")
            .delete()
            .eq("id", id);

        if (error) throw error;
    }

    static async listarQuantidadeAgendas() {
        const { count, error } = await supabase
            .from("agendamentos")
            .select("*", { count: "exact", head: true })

        if (error) throw error;

        return count;
    }
}