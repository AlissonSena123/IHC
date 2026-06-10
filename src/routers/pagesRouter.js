import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";   // ← adiciona
import cookie from "cookie";      // ← adiciona

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware de proteção
function paginaProtegida(req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) return res.redirect("/");

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.redirect("/");
    }
}

// ✅ Públicas
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/login.html"));
});

router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/cadastro.html"));
});

// 🔒 Protegidas
router.get("/dashboard", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/dashboard.html"));
});

router.get("/pacientes", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/listarPacientes.html"));
});

router.get("/cadastrar/paciente", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/cadastrarPaciente.html"));
});

router.get("/criar/agendamento", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/criarAgenda.html"));
});

router.get("/listar/agendamento", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/listarAgenda.html"));
});

router.get("/criar/prontuario", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/criarProntuario.html"));
});

router.get("/ver/prontuario/:id", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/verProntuario.html"));
});

router.get("/agendamento-editar", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/editarAgenda.html"));
});

router.get("/listar/prontuario", paginaProtegida, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/listarProntuarios.html"));
});

export default router;