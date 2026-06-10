
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';


import {cerberusMiddleware} from "./middlewares/CerberusMW.js";
import generationRoutes from "./routes/generationRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";

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

// Rota de health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
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

