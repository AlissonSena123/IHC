import { supabase } from "../config/supabase.js";

export default class FinanceiroModel {

    static async criarFinanceiro(dados) {

        const { data, error } = await supabase
            .from("financeiro")
            .insert([dados])
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    static async listarFinanceiro() {

        const { data, error } = await supabase
            .from("financeiro")
            .select(`
                *,
                paciente(nome,sobrenome)
            `)
            .order("data_movimentacao", {
                ascending: false
            });

        if (error) throw error;

        return data;
    }

    static async excluirFinanceiro(id) {

        const { error } = await supabase
            .from("financeiro")
            .delete()
            .eq("id", id);

        if (error) throw error;
    }

    static async resumoMensal() {

        const { data, error } = await supabase
            .from("financeiro")
            .select("*");

        if (error) throw error;

        return data;
    }
}