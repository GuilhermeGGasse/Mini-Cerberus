import { Router } from "express";
import { generateReport, generateSuggestions, generateExamples } from "../controllers/generationController.js"


const router = Router();

// Endpoint para relatório explicativo
router.post("/report", generateReport);

// Endpoint para sugestões de correção
router.post("/suggestions", generateSuggestions);

// Endpoint para exemplos de código seguro
router.post("/examples", generateExamples);

export default router;
