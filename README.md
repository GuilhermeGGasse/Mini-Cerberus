# 🛡️ Mini Cerberus

Mini Cerberus é uma aplicação backend desenvolvida em Node.js, TypeScript e Inteligência Artificial para auxiliar na análise de payloads de APIs de pagamento, identificando possíveis vulnerabilidades e gerando recomendações de correção de forma automatizada.

O projeto foi criado com o objetivo de explorar conceitos de segurança de APIs, integração com LLMs, arquitetura backend e automação de análises de segurança em ambientes modernos.

---

## 🚀 Funcionalidades

### Análise de Payloads

Recebe payloads JSON e utiliza IA para identificar possíveis riscos de segurança, classificando:

* Vulnerável ou não vulnerável
* Nível de severidade
* Motivo da classificação
* Recomendações de mitigação

### Geração de Relatórios

Com base no diagnóstico obtido, gera relatórios explicativos em linguagem natural contendo:

* Descrição da vulnerabilidade
* Impactos potenciais
* Contexto do problema
* Importância da correção

### Sugestões de Correção

Produz sugestões práticas para auxiliar desenvolvedores na mitigação de falhas encontradas.

### Exemplos de Código

Gera exemplos de implementação mais segura com base nas recomendações fornecidas pela análise.

---

## 🏗️ Arquitetura

```text
Payload JSON
      │
      ▼
Analysis Service
      │
      ▼
Diagnóstico de Segurança
      │
      ├────────────► Report Generator
      │
      ├────────────► Suggestions Generator
      │
      └────────────► Secure Code Generator
```

Estrutura do projeto:

```text
src/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
│
├── app.ts
└── server.ts
```

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* Groq API
* Llama 3.3 70B Versatile
* Helmet
* CORS
* Express Rate Limit
* Dotenv

---

## 📦 Instalação

Clone o projeto:

```bash
git clone https://github.com/GuilhermeGGasse/mini-cerberus.git
cd mini-cerberus
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env`:

```env
GROQ_API_KEY=sua_chave_aqui
PORT=3000
```

Execute em modo desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Executar versão compilada:

```bash
npm start
```

---

## 📡 Endpoints

### Health Check

```http
GET /health
```

Resposta:

```json
{
  "status": "ok"
}
```

---

### Análise de Payload

```http
POST /api/analysis/check
```

Exemplo:

```json
{
  "transactionId": "TXN-123",
  "amount": 99.90,
  "currency": "BRL",
  "status": "approved"
}
```

Resposta:

```json
{
  "diagnostic": {
    "vulneravel": false,
    "severidade": "baixa",
    "motivo": "Payload parece seguro.",
    "recomendacao": "Manter validações adequadas."
  }
}
```

---

### Gerar Relatório

```http
POST /api/generation/report
```

---

### Gerar Sugestões

```http
POST /api/generation/suggestions
```

---

### Gerar Exemplos de Código

```http
POST /api/generation/examples
```

---

## 🔒 Objetivo do Projeto

O Mini Cerberus foi desenvolvido como um projeto de estudo e portfólio voltado para:

* Segurança de APIs
* Integração com Inteligência Artificial
* Arquitetura Backend
* DevSecOps
* Desenvolvimento com TypeScript

O objetivo é explorar como modelos de IA podem auxiliar na identificação de potenciais vulnerabilidades e na geração de recomendações para equipes de desenvolvimento.

---

## ⚠️ Aviso

Este projeto é um protótipo educacional e não deve ser utilizado como única camada de segurança em ambientes de produção. Os resultados fornecidos pela IA devem ser revisados e validados por profissionais de segurança quando aplicados a sistemas reais.

---

## 👨‍💻 Autor

Guilherme Guimarães Gasse

GitHub:
https://github.com/GuilhermeGGasse
