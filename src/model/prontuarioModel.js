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
            .maybeSingle();

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

    static async listarEvolucao(paciente_id) {
        const { data, error } = await supabase
            .from("evolucao_sessao")
            .select("*")
            .eq("paciente_id", paciente_id)  // ← encadeado corretamente
            .order("data_sessao", { ascending: false }); // ← mais recente primeiro

        if (error) throw error;
        return data;
    }

    static async qtdProntuario() {
        const { count, error } = await supabase
            .from("prontuario")
            .select("*", { count: "exact", head: true })

        if(error) throw error;

        return count;
    }
}