# Implementation Plan

## Phase 1 - Scaffold

Create the base app:

- `client` with React, TypeScript, Vite, TailwindCSS
- `server` with Node.js, Express, TypeScript
- root `docker-compose.yml`
- root `README.md`
- `.gitignore`

Done when:

- frontend starts
- backend starts
- `/api/health` returns OK

## Phase 2 - Backend Scanner

Build:

- `POST /api/analyze`
- URL validator
- HTML fetch with timeout
- Cheerio parser
- scanner output object

Done when:

- valid public URL returns scanner data
- invalid URL returns `400`
- fetch failure returns readable error

## Phase 3 - Ollama And Gemma

Build:

- Ollama service integration
- prompt builder
- AI response parser
- Zod validation for AI output

Done when:

- backend sends scanner data to Gemma
- Gemma returns JSON
- malformed AI output is handled safely

## Phase 4 - Final Report API

Build:

- report builder service
- combined scan + analysis response
- consistent API errors

Done when:

- frontend can receive one complete report object
- error responses are predictable

## Phase 5 - Frontend UI

Build:

- URL form
- loading state
- error alert
- score card
- summary panel
- critical and medium issues
- recommendations list
- suggested metadata section
- raw scan highlights

Done when:

- user can run analysis from UI
- report is readable
- mobile layout works

## Phase 6 - Docker

Build:

- frontend Dockerfile
- backend Dockerfile
- Compose services for frontend, backend, Ollama
- environment variables

Done when:

```bash
docker compose up
```

starts the app locally.

## Phase 7 - Polish And Submission

Finish:

- README
- screenshots
- DEV article draft
- model selection explanation
- limitations section
- future features section

Done when:

- app can be demoed
- repo is understandable
- DEV post has screenshots and GitHub link

## Build Priority

The order is strict:

```txt
Backend scanner -> Gemma integration -> API contract -> UI -> Docker -> submission polish
```

Do not spend time on non-MVP features before the complete workflow works.

