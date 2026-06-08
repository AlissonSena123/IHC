import express from "express";

/** OS imports dos scripts que estão na pasta rotas */
import pageRoutes from "./src/routers/pagesRouter.js";
import authRoutes from "./src/routers/authRoutes.js";
import agendamentoRoutes from "./src/routers/agendaRoutes.js";
import pacienteRouter from "./src/routers/pacienteRouter.js"
import prontuarioRouter from "./src/routers/prontuarioRouter.js";

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
app.use(prontuarioRouter);

export default app;