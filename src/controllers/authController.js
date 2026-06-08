import AuthService from "../services/authService.js";

export default class AuthController {
    static async cadastro(req, res) {
        try {
            const usuario = await AuthService.cadastrar(req.body);
            res.status(201).json(usuario);

        } catch (error) {

            res.status(400).json({ erro: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            const { token, usuario } = await AuthService.entrar(email, senha);

            // Seta o cookie HttpOnly aqui
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // só HTTPS em prod
                sameSite: 'strict',
                maxAge: 8 * 60 * 60 * 1000 // 8h em ms
            });

            // Retorna só os dados do usuário (sem o token no body)
            return res.status(200).json({ success: true, usuario });
        } catch (error) {

            res.status(401).json({ erro: error.message });
        }
    }

    static async me(req, res) {
        try {
            // req.usuario já vem do authMiddleware (id e perfil do token)
            const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            // Retorna sem a senha
            const { senha, ...dadosPublicos } = usuario;
            return res.status(200).json(dadosPublicos);

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}
