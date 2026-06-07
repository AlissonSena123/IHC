import { supabase } from "../config/supabase.js";

export default class UsuarioModel {
    static async buscarPorEmail(email) {
        const { data, error } = await supabase
            .from("psicologo")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) throw error;

        return data;
    }

    static async cadastrarUsuário(usuario) {
        const {data, error} = await supabase
            .from("psicologo")
            .insert(usuario)
            .select()
            .single();

        if(error) throw error;

        return data;
    }
}