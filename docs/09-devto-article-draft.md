# DEV Article Draft

Title:

```txt
Building a Local AI SEO Agent with Gemma, Ollama, Docker, and React
```

## Introduction

I built Local AI SEO Agent for the Gemma 4 Challenge.

It is a local AI-powered SEO audit tool. The user enters a public website URL, the app scans the page for technical SEO signals, and Gemma turns those structured signals into a practical SEO report.

The key constraint was important: no cloud AI APIs. The AI analysis runs locally through Ollama.

## The Problem

SEO audits are useful, but many SEO tools depend on cloud platforms, paid APIs, or external AI providers.

That creates a few problems:

- page data leaves the local machine
- every AI request can have token cost
- local development depends on external services
- the product becomes less portable

For this challenge, I wanted to build something practical that shows where local AI is useful: turning deterministic scan data into human-readable recommendations.

## What The App Does

The app follows a simple workflow:

```txt
URL -> SEO scan -> Gemma analysis -> validated JSON -> report UI
```

The scanner extracts:

- title and meta description
- canonical, robots, and viewport tags
- heading structure
- image alt coverage
- internal and external link counts
- empty links
- Open Graph tags
- JSON-LD schema count
- visible text length and word count

Gemma then generates:

- SEO score
- summary
- critical issues
- medium issues
- recommendations
- suggested title
- suggested meta description

## Why Gemma

I used `gemma4:e4b` through Ollama.

The model is a good fit because the task is not open-ended chat. It is structured reasoning over a compact set of SEO facts. Gemma receives scanner data, identifies SEO problems, and returns a strict JSON object that the backend validates before sending it to the frontend.

I selected `gemma4:e4b` because it has stronger reasoning capacity than the smallest edge variant while still being practical for local development.

## Architecture

The app has three layers:

```txt
React UI
  -> Express API
  -> SEO scanner
  -> prompt builder
  -> Ollama
  -> Gemma
  -> JSON validator
  -> report UI
```

The frontend never talks directly to Ollama. It only calls the backend.

The backend owns:

- URL validation
- website fetching
- HTML parsing
- prompt building
- Ollama communication
- AI response validation
- report formatting

## Backend Scanner

The scanner is deterministic. It uses Axios to fetch the page HTML and Cheerio to parse it.

This separation matters. The scanner extracts facts, and Gemma interprets those facts. That keeps the AI layer focused on reasoning and recommendations instead of parsing HTML.

Example scanner summary:

```json
{
  "metadata": {
    "title": "Auto Locksmith London - 2,000+ Reviews | Car Key Replacement",
    "metaDescriptionLength": 155
  },
  "headings": {
    "counts": {
      "h1": 1,
      "h2": 13
    }
  },
  "images": {
    "total": 36,
    "missingAlt": 0
  },
  "schema": {
    "count": 0
  },
  "content": {
    "wordCount": 878
  }
}
```

## Prompt And JSON Validation

The prompt tells Gemma to return JSON only.

The required shape is:

```json
{
  "score": 92,
  "summary": "Short SEO summary",
  "criticalIssues": [],
  "mediumIssues": [],
  "recommendations": [],
  "suggestedTitle": "",
  "suggestedMetaDescription": ""
}
```

The backend validates the response with Zod. If Gemma returns malformed JSON or missing required fields, the API returns a clean error instead of passing unreliable data to the UI.

I also reduced the prompt size by sending a scanner summary instead of the full raw scan object. That helped keep local inference more predictable.

## Frontend

The frontend is a React and TailwindCSS app.

It includes:

- URL input
- loading state with elapsed time
- SEO score card
- summary panel
- issue lists
- recommendations
- suggested metadata
- scan highlights

The loading state is important because local inference can take time. On my machine, a full audit with `gemma4:e4b` takes around 1-2 minutes depending on whether the model is already loaded.

## Docker Setup

The project runs with Docker Compose:

```bash
docker compose up -d --build
```

The services are:

- frontend
- backend
- ollama

The Docker ports are:

- frontend: `http://localhost:5174`
- backend: `http://localhost:3001`
- Ollama: `http://localhost:11435`

After starting the containers, the model can be pulled with:

```bash
docker compose exec ollama ollama pull gemma4:e4b
```

## Screenshots

Add these screenshots to the DEV post before publishing:

```md
![Homepage](TODO upload screenshots/homepage.png)
![Loading state](TODO upload screenshots/loading.png)
![SEO report](TODO upload screenshots/report.png)
![Scan highlights](TODO upload screenshots/scan-highlights.png)
![Recommendations](TODO upload screenshots/recommendations.png)
![Docker containers](TODO upload screenshots/docker-containers.png)
```

## Challenges

The biggest challenge was local model latency.

The scanner is fast, but local inference with a 9.6GB model is hardware-dependent. The first request can be slow because Ollama needs to load the model into memory.

I handled this by:

- increasing the Ollama request timeout
- adding a better loading state
- reducing prompt size
- validating AI output carefully

Another challenge was keeping the app safe. Since the backend fetches user-provided URLs, I added validation to reject localhost, loopback, private network IPs, malformed URLs, and unsupported protocols.

## What I Learned

Local AI works well when the task is clearly bounded.

For this project, Gemma does not need to browse the web or guess what is on the page. The scanner gives it structured data, and the model focuses on interpretation.

That pattern feels practical:

```txt
deterministic extraction + local AI reasoning + strict validation
```

## Future Work

I intentionally kept the MVP focused on one-page analysis.

Future improvements could include:

- multi-page crawling
- sitemap support
- report history
- PDF export
- Lighthouse integration
- browser extension
- WordPress plugin

## Conclusion

Local AI SEO Agent shows how Gemma can power a real developer tool without relying on cloud AI APIs.

The project combines deterministic SEO scanning with local AI reasoning, validates the model output, and presents the result in a clean web UI.

GitHub repository:

```txt
TODO: add repository URL
```
