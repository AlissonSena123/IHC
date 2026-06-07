import { supabase } from "../config/supabase";

export default class PacienteModel {
    static async listarPacientes() {
        const { data, error } = await supabase
            .from("paciente")
            .select("*")

        if (error) throw error;

        return data;
    }

    static async cadastrarPaciente(dados) {
        const { data, error } = await supabase
            .from("paciente")
            .insert(dados)
            .select();

        if(error) throw error

        return data;
    }
}