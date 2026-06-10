import { Router } from "express";

import DashboardController from "../controllers/dashboardController.js";

const router = Router();

router.get("/api/dashboard", DashboardController.resumo);

export default router;