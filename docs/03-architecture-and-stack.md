# Architecture And Stack

## Architecture

```txt
React UI
  -> Express API
  -> URL validator
  -> SEO scanner
  -> prompt builder
  -> Ollama
  -> Gemma
  -> AI JSON validator
  -> report builder
  -> React report UI
```

## Responsibilities

Frontend:

- collect URL
- call backend API
- show loading, error, and report states
- never talk directly to Ollama

Backend:

- validate input
- fetch HTML
- extract SEO data
- call Ollama
- validate AI JSON
- return final report

Ollama/Gemma:

- analyze structured SEO data
- score SEO quality
- produce actionable recommendations
- return JSON only

## Stack

Frontend:

- React
- TypeScript
- Vite
- TailwindCSS

Backend:

- Node.js
- Express
- TypeScript
- Axios
- Cheerio
- Zod

Local AI:

- Ollama
- Gemma model

Infrastructure:

- Docker
- Docker Compose

## Repository Structure

Target structure:

```txt
local-ai-seo-agent/
  client/
    src/
      components/
      pages/
      services/
      types/
      utils/
  server/
    src/
      controllers/
      middleware/
      prompts/
      routes/
      services/
      types/
      validators/
      app.ts
  docs/
  screenshots/
  docker-compose.yml
  README.md
```

## Backend Service Structure

Recommended backend files:

```txt
server/src/routes/analyze.routes.ts
server/src/controllers/analyze.controller.ts
server/src/services/seo-scanner.service.ts
server/src/services/ai-analyzer.service.ts
server/src/services/report.service.ts
server/src/prompts/seo-analysis.prompt.ts
server/src/validators/analyze.validator.ts
server/src/validators/ai-response.validator.ts
server/src/types/seo.types.ts
server/src/types/api.types.ts
```

## Frontend Component Structure

Recommended frontend files:

```txt
client/src/components/UrlForm.tsx
client/src/components/SeoScoreCard.tsx
client/src/components/IssueList.tsx
client/src/components/RecommendationList.tsx
client/src/components/MetadataSuggestions.tsx
client/src/components/LoadingState.tsx
client/src/components/ErrorAlert.tsx
client/src/services/analyze.service.ts
client/src/types/report.types.ts
```

## Engineering Rules

- Keep controllers thin.
- Keep business logic in services.
- Keep prompts in `server/src/prompts`.
- Validate request bodies with Zod.
- Validate AI responses before returning them.
- Return predictable JSON responses.
- Keep the app stateless for MVP.
- Do not expose Ollama details to the frontend.

