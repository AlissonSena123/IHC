import { supabase } from "../config/supabase.js";

export default class AgendamentoModel {
    static async listarAgenda() {
        const { data, error } = await supabase
            .from("agendamentos")
            .select(`
                *,
                paciente(nome),
                psicologo(nome)
            `);

        if(error) throw error;

        return data;
    }

    static async buscarAgendaPorId(id){

        const { data, error } = await supabase
            .from("agendamentos")
            .select("*")
            .eq("id", id)
            .single();

        if(error) throw error;

        return data;
    }

    static async criarAgenda(dados){

        const { data, error } = await supabase
            .from("agendamentos")
            .insert(dados)
            .select()
            .single();

        if(error) throw error;

        return data;
    }

    static async atualizarAgenda(id, dados){

        const { data, error } = await supabase
            .from("agendamentos")
            .update(dados)
            .eq("id", id)
            .select()
            .single();

        if(error) throw error;

        return data;
    }

    static async excluirAgenda(id){

        const { error } = await supabase
            .from("agendamentos")
            .delete()
            .eq("id", id);

        if(error) throw error;
    }
}