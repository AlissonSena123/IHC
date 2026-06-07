import AuthService from "../services/authService.js";

export default class AuthController {
    static async cadastro(req, res) {
        try {
            const usuario = await AuthService.cadastrar(req.body);
            res.status(201).json(usuario);

        } catch(error) {

            res.status(400).json({erro: error.message});
        }
    }

    static async login(req, res) {
        try {
            const resultado = await AuthService.entrar(req.body.email, req.body.senha);
            res.json(resultado);
        } catch(error) {

            res.status(401).json({erro: error.message});
        }
    }
}
