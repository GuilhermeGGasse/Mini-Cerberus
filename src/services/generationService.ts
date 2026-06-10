const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.GROQ_API_KEY;

import type { GroqResponse } from "../models/diagnostic.js";

export const generationService = {
  async generateReport(diagnostic: any): Promise<string> {
    const prompt = `Você é um especialista em segurança de APIs de pagamento.
    Com base neste diagnóstico já pronto:
    ${JSON.stringify(diagnostic)}
    Gere um relatório explicativo em linguagem natural, descrevendo:
    - A vulnerabilidade encontrada
    - O impacto potencial
    - O contexto da falha
    - A importância da correção.`;

    return await callIA(prompt);
  },

  async generateSuggestions(diagnostic: any): Promise<string> {
    const prompt = `Com base neste diagnóstico:
    ${JSON.stringify(diagnostic)}
    Liste sugestões práticas de correção para resolver a vulnerabilidade,
    em formato de tópicos claros e objetivos.`;

    return await callIA(prompt);
  },

  async generateExamples(diagnostic: any): Promise<string> {
    const prompt = `Com base neste diagnóstico:
    ${JSON.stringify(diagnostic)}
    Gere um exemplo de código seguro corrigido,
    mostrando como implementar a solução recomendada.`;

    return await callIA(prompt);
  }
};

// função utilitária para chamar a IA
async function callIA(prompt: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192", // modelo Groq
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 500
    })
  });

  const data = await response.json() as GroqResponse;
  return data.choices?.[0]?.message?.content || "Não foi possível gerar conteúdo.";
}
