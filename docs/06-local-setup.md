# Local Setup

## Required Software

Install:

- Git
- Node.js 22+
- Docker Desktop
- Ollama latest

Verify:

```bash
git --version
node -v
npm -v
docker --version
docker compose version
ollama --version
```

Important: Gemma 4 models require a recent Ollama version. Ollama `0.6.2` is too old for `gemma4:e4b`.

## Pull Gemma

Model page:

```txt
https://ollama.com/library/gemma4
```

```bash
ollama pull gemma4:e4b
```

If this fails with a message saying the model requires a newer Ollama version, update Ollama or use the Docker Compose `ollama/ollama:latest` service.

Record the exact model tag in the README and DEV post.

## Environment Variables

Backend:

```env
PORT=3000
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=gemma4:e4b
```

Frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

Do not commit `.env` files.

## Expected Ports

```txt
frontend: http://localhost:5173
backend:  http://localhost:3000
ollama:   http://localhost:11434
```

## Docker Run

Target command:

```bash
docker compose up
```

If a model must be pulled before running the app:

```bash
ollama pull gemma4:e4b
```

## Manual Development Run

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

## Verification Checklist

- frontend opens in browser
- backend health endpoint works
- Ollama responds locally
- test URL analysis works
- invalid URL returns friendly error
- report renders in UI

## Common Problems

Ollama unavailable:

- check Ollama is running
- check `OLLAMA_URL`
- check model is pulled

Slow responses:

- use smaller model
- reduce prompt size
- test without Docker if needed

Port conflict:

- change frontend or backend port
- update environment variables
