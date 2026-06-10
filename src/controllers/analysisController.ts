import { Request, Response } from "express";
import { analisarPayload } from "../services/analysisService.js";

export async function checkPayload(req: Request, res: Response) {
  try {
    const payload = req.body;
    const diagnostic = await analisarPayload(JSON.stringify(payload));

    // Se vulnerável e severidade alta → bloqueio
    if (diagnostic.vulneravel && diagnostic.severidade === "alta") {
      return res.status(403).json({
        message: "Requisição bloqueada por vulnerabilidade crítica",
        diagnostic
      });
    }

    // Caso contrário → retorna diagnóstico
    res.status(200).json({ diagnostic });
  } catch (error) {
    console.error("Erro na análise:", error);
    res.status(500).json({ error: "Erro ao analisar payload" });
  }
}
