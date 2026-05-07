# Task Checklist

Use this file as the main project execution checklist.

Status format:

- `[ ]` not done
- `[ + ]` done

## 01 - Planning And Documentation

- `[ + ]` Read Gemma challenge requirements.
- `[ + ]` Read the original project documentation.
- `[ + ]` Simplify the documentation structure.
- `[ + ]` Create clear project docs in `docs/`.
- `[ + ]` Delete old archived docs after approval.
- `[ + ]` Confirm the exact Gemma 4 Ollama model tag.
- `[ + ]` Update docs with the final model tag.

## 02 - Repository Setup

- `[ + ]` Initialize Git repository if needed.
- `[ + ]` Create root `.gitignore`.
- `[ + ]` Create root `README.md`.
- `[ + ]` Create `screenshots/` folder.
- `[ + ]` Create base `client/` app.
- `[ + ]` Create base `server/` app.
- `[ + ]` Add root `docker-compose.yml`.

## 03 - Backend Foundation

- `[ + ]` Set up Node.js, Express, and TypeScript.
- `[ + ]` Add backend scripts for dev, build, and start.
- `[ + ]` Add backend environment variable loading.
- `[ + ]` Create Express app entry point.
- `[ + ]` Create `/api/health` endpoint.
- `[ + ]` Add central error middleware.
- `[ + ]` Add basic request logging.

## 04 - Backend API Contract

- `[ + ]` Create `POST /api/analyze` route.
- `[ + ]` Create analyze controller.
- `[ + ]` Create request validator with Zod.
- `[ + ]` Return consistent success response.
- `[ + ]` Return consistent error response.
- `[ + ]` Test invalid request body.
- `[ + ]` Test valid request body.

## 05 - URL Security And Validation

- `[ + ]` Accept only `http://` and `https://`.
- `[ + ]` Reject empty URLs.
- `[ + ]` Reject malformed URLs.
- `[ + ]` Reject `localhost`.
- `[ + ]` Reject loopback IP addresses.
- `[ + ]` Reject private network IP addresses.
- `[ + ]` Reject unsupported protocols.
- `[ ]` Add validation tests or manual test cases.

## 06 - SEO Scanner

- `[ + ]` Install Axios and Cheerio.
- `[ + ]` Create `seo-scanner.service.ts`.
- `[ + ]` Fetch HTML with timeout.
- `[ + ]` Support redirects.
- `[ + ]` Handle fetch failures.
- `[ + ]` Parse HTML with Cheerio.
- `[ + ]` Extract page title.
- `[ + ]` Extract meta description.
- `[ + ]` Extract canonical URL.
- `[ + ]` Extract robots meta.
- `[ + ]` Extract viewport meta.
- `[ + ]` Extract `h1` through `h6`.
- `[ + ]` Count images.
- `[ + ]` Count missing image alt attributes.
- `[ + ]` Store sample missing-alt images.
- `[ + ]` Count internal links.
- `[ + ]` Count external links.
- `[ + ]` Count empty links.
- `[ + ]` Extract Open Graph fields.
- `[ + ]` Count JSON-LD schema blocks.
- `[ + ]` Extract schema types when possible.
- `[ + ]` Estimate visible text length.
- `[ + ]` Estimate word count.
- `[ + ]` Return scanner output in the documented shape.

## 07 - Gemma And Ollama Integration

- `[ + ]` Install or verify Ollama locally.
- `[ ]` Pull the selected Gemma model.
- `[ + ]` Add `OLLAMA_URL` environment variable.
- `[ + ]` Add `OLLAMA_MODEL` environment variable.
- `[ + ]` Create `ai-analyzer.service.ts`.
- `[ + ]` Create Ollama client function.
- `[ + ]` Send non-streaming request to Ollama.
- `[ + ]` Handle Ollama unavailable errors.
- `[ + ]` Handle Ollama timeout errors.
- `[ ]` Log safe AI failure details for debugging.

## 08 - Prompt Engineering

- `[ + ]` Create `server/src/prompts/seo-analysis.prompt.ts`.
- `[ + ]` Build prompt from scanner JSON.
- `[ + ]` Tell Gemma to return JSON only.
- `[ + ]` Tell Gemma not to return markdown.
- `[ + ]` Tell Gemma to analyze only provided data.
- `[ + ]` Ask for SEO score from 0 to 100.
- `[ + ]` Ask for critical issues.
- `[ + ]` Ask for medium issues.
- `[ + ]` Ask for recommendations.
- `[ + ]` Ask for suggested title.
- `[ + ]` Ask for suggested meta description.
- `[ ]` Test prompt with a real scanned page.
- `[ ]` Reduce prompt size if responses are too slow.

## 09 - AI Response Validation

- `[ + ]` Create AI response Zod schema.
- `[ + ]` Validate `score` as number from 0 to 100.
- `[ + ]` Validate `summary` as string.
- `[ + ]` Validate issue arrays.
- `[ + ]` Validate recommendation array.
- `[ + ]` Validate metadata suggestions.
- `[ + ]` Parse JSON safely from Ollama response.
- `[ + ]` Return readable error on malformed AI JSON.
- `[ ]` Add fallback handling for missing optional text.

## 10 - Report Builder

- `[ + ]` Create `report.service.ts`.
- `[ + ]` Combine scanner data and AI analysis.
- `[ + ]` Return final `success: true` response.
- `[ + ]` Include original URL.
- `[ + ]` Include final URL after redirects.
- `[ + ]` Include scan summary.
- `[ + ]` Include AI analysis.
- `[ + ]` Keep response compatible with frontend types.

## 11 - Frontend Foundation

- `[ + ]` Set up React, TypeScript, Vite, and TailwindCSS.
- `[ + ]` Add frontend scripts for dev and build.
- `[ + ]` Add `VITE_API_URL` environment variable.
- `[ + ]` Create base app layout.
- `[ + ]` Create frontend report types.
- `[ + ]` Create API service for `/api/analyze`.

## 12 - Frontend URL Flow

- `[ + ]` Create URL input form.
- `[ + ]` Add placeholder example URL.
- `[ + ]` Validate URL before submit.
- `[ + ]` Create Analyze button.
- `[ + ]` Disable button while loading.
- `[ + ]` Submit request to backend.
- `[ + ]` Store current report state.
- `[ + ]` Store frontend error state.

## 13 - Frontend Report UI

- `[ + ]` Create SEO score card.
- `[ + ]` Create summary section.
- `[ + ]` Create critical issues section.
- `[ + ]` Create medium issues section.
- `[ + ]` Create recommendations section.
- `[ + ]` Create suggested metadata section.
- `[ + ]` Create raw scan highlights section.
- `[ + ]` Add empty states for no issues.
- `[ + ]` Make report easy to scan.

## 14 - Frontend UX Polish

- `[ + ]` Add loading state.
- `[ + ]` Add user-friendly error alert.
- `[ + ]` Make layout responsive.
- `[ ]` Verify mobile width.
- `[ ]` Verify desktop width.
- `[ ]` Improve spacing and typography.
- `[ ]` Ensure buttons and text do not overflow.
- `[ ]` Add accessible labels.
- `[ ]` Check contrast.

## 15 - Docker

- `[ + ]` Create backend Dockerfile.
- `[ + ]` Create frontend Dockerfile.
- `[ + ]` Add backend service to Compose.
- `[ + ]` Add frontend service to Compose.
- `[ + ]` Add Ollama service to Compose.
- `[ + ]` Add Ollama volume.
- `[ + ]` Connect backend to Ollama through Docker network.
- `[ + ]` Expose frontend port.
- `[ + ]` Expose backend port.
- `[ + ]` Verify `docker compose up`.

## 16 - Testing And Verification

- `[ + ]` Test backend health endpoint.
- `[ ]` Test URL validation cases.
- `[ + ]` Test scanner with `https://example.com`.
- `[ ]` Test scanner with a real content page.
- `[ ]` Test full Gemma analysis flow.
- `[ + ]` Test Ollama unavailable error.
- `[ ]` Test frontend form.
- `[ ]` Test frontend report rendering.
- `[ ]` Test responsive layout.
- `[ + ]` Run TypeScript checks.
- `[ + ]` Run production builds.

## 17 - README

- `[ + ]` Write project summary.
- `[ ]` Add feature list.
- `[ + ]` Add tech stack.
- `[ + ]` Add architecture overview.
- `[ + ]` Add local setup instructions.
- `[ + ]` Add Docker instructions.
- `[ + ]` Add exact Gemma model tag.
- `[ ]` Add screenshots.
- `[ ]` Add limitations.
- `[ ]` Add future features.
- `[ ]` Add contest note.

## 18 - Screenshots

- `[ ]` Capture homepage screenshot.
- `[ ]` Capture loading state screenshot.
- `[ ]` Capture completed report screenshot.
- `[ ]` Capture recommendation section screenshot.
- `[ ]` Capture Docker running screenshot.
- `[ ]` Save screenshots under `screenshots/`.
- `[ ]` Reference screenshots in README.
- `[ ]` Reference screenshots in DEV post.

## 19 - DEV Submission

- `[ ]` Create DEV article draft.
- `[ ]` Use the contest submission template.
- `[ ]` Explain the problem.
- `[ ]` Explain why local AI matters.
- `[ ]` Explain why Gemma was selected.
- `[ ]` Explain architecture.
- `[ ]` Explain scanner implementation.
- `[ ]` Explain AI prompt and JSON validation.
- `[ ]` Include screenshots.
- `[ ]` Include GitHub repository link.
- `[ ]` Include limitations and future work.
- `[ ]` Review article for clarity.
- `[ ]` Submit before May 24, 2026 at 11:59 PM PDT.

## 20 - Final Quality Gate

- `[ ]` App runs locally.
- `[ + ]` App runs with Docker.
- `[ ]` Full analysis workflow works.
- `[ ]` No cloud AI API is used.
- `[ ]` Gemma is central to the product.
- `[ ]` Error handling is clean.
- `[ ]` UI is polished enough for screenshots.
- `[ ]` README is complete.
- `[ ]` DEV post is complete.
- `[ ]` Repository is ready to share.
