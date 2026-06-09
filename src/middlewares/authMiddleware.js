import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
    const token = req.cookies?.token; 

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