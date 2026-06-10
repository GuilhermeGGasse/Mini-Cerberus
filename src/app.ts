
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { cerberusMiddleware } from "./middlewares/CerberusMW.js";
import generationRoutes from "./routes/generationRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";

import { analisarPayload } from "./services/analysisService.js";

dotenv.config();

const app: Application = express();

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/api", cerberusMiddleware);

app.use("/api/analysis", analysisRoutes);
app.use("/api/generation", generationRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    name: "Mini Cerberus",
    status: "online",
    version: "1.0.0",
    endpoints: [
      "/health",
      "/api/analysis/check",
      "/api/generation/report",
      "/api/generation/suggestions",
      "/api/generation/examples"
    ]
  });
});

// Rota de health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get("/demo/seguro", async (req, res) => {
  const payload = {
    "transactionId": "TXN-123",
    "amount": 99.90,
    "currency": "BRL",
    "status": "approved",
    "timestamp": "2026-06-10T12:00:00Z",
    "signature": "sha256_abcdef123456",
    "merchantId": "MERCHANT-001"
  };

  const diagnostic = await analisarPayload(
    JSON.stringify(payload)
  );

  res.json({
    payload,
    diagnostic
  });
});

app.get("/demo/vulneravel", async (req, res) => {
  const payload = {
    transactionId: "",
    amount: -5000,
    currency: "BRL",
    status: "approved",
    sql: "' OR 1=1 --"
  };

  const diagnostic = await analisarPayload(
    JSON.stringify(payload)
  );

  res.json({
    payload,
    diagnostic
  });
});

// Rota não encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Erro global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

export default app;

