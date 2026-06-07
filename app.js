import express from "express";

import pageRoutes from "./src/routers/pagesRouter.js";
import authRoutes from "./src/routers/authRoutes.js";
import agendamentoRoutes from "./src/routers/agendaRoutes.js";
import pacienteRouter from "./src/routers/pacienteRouter.js"

const app = express();

app.use(express.json());

// arquivos estáticos
app.use(express.static("public"));

// páginas HTML
app.use(pageRoutes);

// API
app.use(authRoutes);
app.use(agendamentoRoutes);
app.use(pacienteRouter);

export default app;