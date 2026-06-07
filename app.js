import express from "express";

import pageRoutes from "./routes/pageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

// arquivos estáticos
app.use(express.static("public"));

// páginas HTML
app.use(pageRoutes);

// API
app.use(authRoutes);

export default app;