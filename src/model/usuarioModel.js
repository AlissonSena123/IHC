import { supabase } from "../config/supabase.js";

export default class UsuarioModel {
    static async buscarPorEmail(email) {
        const { data, error } = await supabase
            .from("usuario")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) throw error;

        return data;
    };

    static async cadastrarUsuário(usuario) {
<<<<<<< HEAD
        const { data, error } = await supabase
=======
        const {data, error} = await supabase
>>>>>>> c7f6288fef35e2d3f92eea395db01c254b6b4244
            .from("usuario")
            .insert(usuario)
            .select()
            .single();

        if (error) throw error;

        return data;
    };

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from("usuario")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw new Error(error.message);
        return data;
    }
}