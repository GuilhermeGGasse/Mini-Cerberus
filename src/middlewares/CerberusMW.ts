import { Request, Response, NextFunction } from "express";
import { analisarPayload } from "../services/analysisService.js";
import { generationService } from "../services/generationService.js";
import { DiagnosticoIA } from "../models/diagnostic.js";

export async function cerberusMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const diagnostic: DiagnosticoIA = await analisarPayload(JSON.stringify(payload));

    // Se vulnerável e severidade alta → bloqueio imediato
    if (diagnostic.vulneravel && diagnostic.severidade === "alta") {
      // Opcional: gerar relatório automático
      const report = await generationService.generateReport(diagnostic);
      const suggestions = await generationService.generateSuggestions(diagnostic);
      const examples = await generationService.generateExamples(diagnostic);

      return res.status(403).json({
        message: "Requisição bloqueada por vulnerabilidade crítica",
        diagnostic,
        report,
        suggestions,
        examples
      });
    }

    // Se vulnerável mas não crítico → apenas alerta
    if (diagnostic.vulneravel) {
      req.body.diagnostic = diagnostic; // anexa diagnóstico para uso posterior
      console.warn("⚠️ Vulnerabilidade detectada:", diagnostic);
    }

    // Prossegue para o próximo middleware/controller
    next();
  } catch (error) {
    console.error("Erro no cerberusMiddleware:", error);
    res.status(500).json({ error: "Erro interno na análise de segurança" });
  }
}
