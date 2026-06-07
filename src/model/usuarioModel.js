import { supabase } from "../config/supabase";

export default class UsuarioModel {
    static async buscarPorEmail(email) {
        const { data, error } = await supabase
            .from("psicologo")
            .select("*")
            .eq("email", email)
            .single();

        if (error) throw error;

        return data;
    }

    static cadastrarUsuário(usuario) {
        const {data, error} = await supabase
            .from("psicologo")
            .insert(usuario)
            .select()
            .single();

        if(error) throw error;

        return data;
    }
}