import { supabase } from "../config/supabase.js";

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
            .insert({
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                email: dados.email,
                telefone: dados.telefone,
                CPF: dados.CPF,
                dataNascimento: dados.data,
                endereco: dados.endereco
            })
            .select()
            .single();

        if (error) throw error

        return data;
    }

    static async listarQuantidadePacientes() {
        const { count, error } = await supabase
            .from("paciente")
            .select("*", { count: "exact", head: true })

        if (error) throw error;

        return count;
    }

    static async deletarPaciente(id) {
        // Deleta evoluções de sessão do paciente
        await supabase
            .from("evolucao_sessao")
            .delete()
            .eq("paciente_id", id);

        // Deleta prontuário do paciente
        await supabase
            .from("prontuario")
            .delete()
            .eq("paciente_id", id);

        // Deleta agendamentos do paciente
        await supabase
            .from("agendamentos")
            .delete()
            .eq("paciente_id", id);

        // Agora deleta o paciente
        const { error } = await supabase
            .from("paciente")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
}