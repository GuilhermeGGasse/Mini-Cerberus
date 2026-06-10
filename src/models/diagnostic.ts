export interface DiagnosticoIA {
  vulneravel: boolean;
  severidade: "baixa" | "media" | "alta";
  motivo: string;
  recomendacao: string;
}

export interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}