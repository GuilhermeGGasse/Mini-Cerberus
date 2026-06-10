import { Router } from "express";
import { checkPayload } from "../controllers/analysisController.js";

const router = Router();

// Endpoint para análise de payloads
router.post("/check", checkPayload);

export default router;
