// authMiddleware.js
import jwt from "jsonwebtoken";
import cookie from "cookie"; // já vem com o Node

export default function authMiddleware(req, res, next) {

    // Lê o token do cookie em vez do Authorization header
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return res.status(401).json({ erro: "Token não informado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch {
        return res.status(401).json({ erro: "Token inválido" });
    }
}