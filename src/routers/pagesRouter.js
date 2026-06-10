import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Aqui ficam as rotas das paginas do nosso projeto */

// Login
router.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/login.html"
        )
    );
});

// Cadastro
router.get("/cadastro", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/cadastro.html"
        )
    );
});

// Dashboard
router.get("/dashboard", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/dashboard.html"
        )
    );
});

// Paciente
router.get("/cadastrar/paciente", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/cadastrarPaciente.html"
        )
    );
});

router.get("/pacientes", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/listarPacientes.html"
        )
    );
});


// Agenda
router.get("/criar/agendamento", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/criarAgenda.html"
        )
    );
});

router.get("/listar/agendamento", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/listarAgenda.html"
        )
    );
});

// router.get("/listar/prontuario", (req, res) => {
//     res.sendFile(
//         path.join(
//             __dirname,
//             "../../public/views/listarProntuarios.html"
//         )
//     );
// });

//Prontuarios
router.get("/criar/prontuario", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/views/criarProntuario.html"
        )
    );
});

router.get("/ver/prontuario/:id", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/views/verProntuario.html")
    );
});

export default router;