# Local AI SEO Agent

A privacy-friendly SEO audit tool that runs AI analysis locally with Gemma through Ollama.

The app scans a public webpage, extracts SEO signals, sends structured data to a local Gemma model, and displays a clear SEO report without using cloud AI APIs.

## Workflow

```txt
URL -> SEO scan -> Gemma via Ollama -> structured AI report -> React UI
```

## Stack

- Frontend: React, TypeScript, Vite, TailwindCSS
- Backend: Node.js, Express, TypeScript, Axios, Cheerio, Zod
- Local AI: Ollama, Gemma
- Infrastructure: Docker Compose

## Development

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Default URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Ollama: http://localhost:11434

## Environment

Backend `server/.env`:

```env
PORT=3000
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=gemma4:e4b
```

Frontend `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Docker

Target command:

```bash
docker compose up
```

Default model:

```txt
gemma4:e4b
```

This tag was selected because it is a Gemma 4 edge model with stronger reasoning capacity than the smallest variant while still being practical for local development.
