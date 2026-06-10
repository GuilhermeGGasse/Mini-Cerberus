// analysisService.ts
import dotenv from "dotenv";
import type { DiagnosticoIA, GroqResponse } from "../models/diagnostic.js";

dotenv.config();

export async function analisarPayload(payload: string): Promise<DiagnosticoIA> {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Você é um especialista em segurança de APIs de pagamento.
Analise o payload recebido e identifique vulnerabilidades.
Responda APENAS em JSON válido, sem texto adicional, sem markdown, sem blocos de código.

Formato obrigatório:
{
  "vulneravel": boolean,
  "severidade": "baixa" | "media" | "alta",
  "motivo": "string",
  "recomendacao": "string"
}`,
          },
          {
            role: "user",
            content: `Analise este payload de webhook de pagamento: ${payload}`,
          },
        ],
        temperature: 0.1,
      }),
    }
  );

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("DATA:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(
      `Groq retornou ${response.status}: ${
        data?.error?.message ?? "Erro desconhecido"
      }`
    );
  }

  if (
    !data ||
    !data.choices ||
    !Array.isArray(data.choices) ||
    data.choices.length === 0
  ) {
    throw new Error(
      `Resposta inesperada da Groq: ${JSON.stringify(data)}`
    );
  }

  const texto = data.choices[0].message.content;

  try {
    return JSON.parse(texto) as DiagnosticoIA;
  } catch (error) {
    console.error("Erro ao converter resposta da IA em JSON:", texto);

    return {
      vulneravel: false,
      severidade: "baixa",
      motivo: "A IA retornou uma resposta fora do formato esperado",
      recomendacao: "Verificar prompt e resposta do modelo",
    };
  }
}