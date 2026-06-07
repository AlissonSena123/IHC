import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsuarioModel from "../model/usuarioModel.js";

export default class AuthService {

    static async cadastrar(dados) {
        const usuarioExistente = await UsuarioModel.buscarPorEmail(dados.email);

        if(usuarioExistente){
            throw new Error("Usuário já cadastrado");
        }

        const senhaHash = await bcrypt.hash(dados.senha, 10);

        return UsuarioModel.cadastrarUsuário({
            nome: dados.nome,
            email: dados.email,
            senha: senhaHash,
            telefone: dados.telefone,
            perfil: dados.perfil,
            ativo: true
        });
    }

    static async entrar(email, senha) {
        const usuario = await UsuarioModel.buscarPorEmail(email);

        if(!usuario) throw new Error("Credenciais inválidas");

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida) throw new Error("Credenciais inválidas");

        const token = jwt.sign({
            id: usuario.id,
            perfil: usuario.perfil
        }, process.env.JWT_SECRET, {
            expiresIn: "8h"
        });

        return {token, usuario};
    
    }
}