import { Request, Response } from "express";
import { generationService } from "../services/generationService.js";

export async function generateReport(req: Request, res: Response) {
  try {
    const diagnostic = req.body; // diagnóstico já pronto
    const report = await generationService.generateReport(diagnostic);
    res.status(200).json({ report });
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    res.status(500).json({ error: "Erro ao gerar relatório" });
  }
}

export async function generateSuggestions(req: Request, res: Response) {
  try {
    const diagnostic = req.body;
    const suggestions = await generationService.generateSuggestions(diagnostic);
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Erro ao gerar sugestões:", error);
    res.status(500).json({ error: "Erro ao gerar sugestões" });
  }
}

export async function generateExamples(req: Request, res: Response) {
  try {
    const diagnostic = req.body;
    const examples = await generationService.generateExamples(diagnostic);
    res.status(200).json({ examples });
  } catch (error) {
    console.error("Erro ao gerar exemplos:", error);
    res.status(500).json({ error: "Erro ao gerar exemplos" });
  }
}
