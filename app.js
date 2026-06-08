import express from "express";
import cookieParser from "cookie-parser"; // <-- adicionar
import cors from "cors";                  // <-- adicionar

import pageRoutes from "./src/routers/pagesRouter.js";
import authRoutes from "./src/routers/authRoutes.js";
import agendamentoRoutes from "./src/routers/agendaRoutes.js";
import pacienteRouter from "./src/routers/pacienteRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser()); // <-- adicionar
app.use(cors({
    origin: true,        // mesmo servidor, então pode deixar true
    credentials: true    // <-- necessário para cookie funcionar
}));

app.use(express.static("public"));
app.use(pageRoutes);
app.use(authRoutes);
app.use(agendamentoRoutes);
app.use(pacienteRouter);

export default app;