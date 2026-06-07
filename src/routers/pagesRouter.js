import { Router } from "express";
const router = Router();
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Login
router.get("/login", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/login.html"
        )
    );
});

// Cadastro
router.get("/cadastro", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/cadastro.html"
        )
    );
});

export default router;