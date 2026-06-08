import { supabase } from "../config/supabase.js";

export default class ProntuarioModel {
    static async criarProtuario(dados) {
        const { data, error } = await supabase
            .from("prontuario")
            .insert([dados])
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    static async buscarPorPaciente(id) {
        const { data, error } = await supabase
            .from("prontuario")
            .select("*")
            .eq("paciente_id", id)
            .single();

        if (error) throw error;

        return data;
    }

    static async atualizarProntuario(id, dados) {
        const { data, error } = await supabase
            .from("prontuario")
            .update(dados)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    static async criarEvolucao(dados) {
        const { data, error } = await supabase
            .from("evolucao_sessao")
            .insert([dados])
            .select()
            .single()

        if (error) throw error;

        return data;
    }

    static async listarEvolucao(id) {
        const { data, error } = await supabase
            .from("evolucao_sessao")
            .select("*")
            eq("id", id)
            .single();

        if (error) throw error;

        return data;
    }
}