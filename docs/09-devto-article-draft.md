# DEV Article Draft

Title:

```txt
Building a Local AI SEO Agent with Gemma, Ollama, Docker, and React
```

## Introduction

For the Gemma 4 Challenge, I built **Local AI SEO Agent**: a privacy-friendly SEO audit tool that runs AI analysis locally with Gemma.

The app takes a public webpage URL, scans the page for technical SEO signals, sends a compact structured summary to Gemma through Ollama, validates the model response, and displays a practical SEO report.

The main constraint was intentional: **no cloud AI APIs**. The AI layer runs locally.

![Homepage](TODO upload screenshots/homepage.png)

## Why Local AI For SEO

SEO audits often include page metadata, headings, links, schema, content structure, and recommendations. That data can be sensitive for businesses, agencies, and in-progress websites.

Cloud AI can be useful, but for this project I wanted to avoid:

- sending page audit data to an external AI provider
- paying per token or per request
- depending on a remote inference API
- building a demo that only works with a hosted service

Local AI fits this workflow well because the task is bounded. The backend extracts facts, then Gemma reasons over those facts.

## What The App Does

The product flow is:

```txt
URL -> SEO scan -> Gemma analysis -> validated JSON -> report UI
```

The deterministic scanner extracts:

- title and meta description
- canonical, robots, and viewport tags
- heading structure
- image alt coverage
- internal, external, and empty link counts
- Open Graph tags
- JSON-LD schema count
- visible text length and word count

Gemma generates:

- SEO score
- summary
- critical issues
- medium issues
- recommendations
- suggested title
- suggested meta description

![SEO report](TODO upload screenshots/report.png)

## How Gemma Is Used

I used:

```txt
gemma4:e4b
```

through Ollama.

Gemma is the reasoning layer of the product. It does not fetch websites and it does not parse HTML. Instead, it receives a structured SEO summary from the backend and converts those signals into a human-readable audit.

That means the AI has a focused job:

```txt
structured SEO facts -> prioritized SEO recommendations
```

I selected `gemma4:e4b` because it is stronger than the smallest edge variant while still being practical for local development. In my local Docker setup, a full audit generally takes around 1-2 minutes depending on whether the model is already loaded.

## Architecture

The app has three main parts:

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

This separation made the project easier to reason about. The scanner extracts facts, Gemma interprets them, and the frontend presents the final report.

## Backend Scanner

The scanner uses Axios to fetch the HTML and Cheerio to parse it.

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

The backend also rejects risky input such as:

- localhost URLs
- loopback IP addresses
- private network IP addresses
- malformed URLs
- unsupported protocols

That matters because the backend fetches user-provided URLs.

## Prompt And JSON Validation

The prompt tells Gemma to return JSON only.

Required output shape:

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

The backend validates the response with Zod before returning it to the frontend.

If Gemma returns malformed JSON, missing required fields, or an invalid score, the API returns a clean error instead of rendering unreliable data.

I also reduced the prompt size by sending a scanner summary instead of the full raw scan object. That made local inference more predictable.

![Recommendations](TODO upload screenshots/recommendations.png)

## Frontend

The frontend is built with React, TypeScript, Vite, and TailwindCSS.

It includes:

- URL input
- loading state with elapsed time
- SEO score card
- summary panel
- issue lists
- recommendations
- suggested metadata
- scan highlights

The loading state is important because local inference can take time, especially on the first request when Ollama loads the model into memory.

![Loading state](TODO upload screenshots/loading.png)

![Scan highlights](TODO upload screenshots/scan-highlights.png)

## Docker Setup

The project runs with Docker Compose:

```bash
docker compose up -d --build
```

The services are:

- frontend
- backend
- ollama

Docker ports:

- frontend: `http://localhost:5174`
- backend: `http://localhost:3001`
- Ollama: `http://localhost:11435`

After starting the containers, pull the model into the Ollama service:

```bash
docker compose exec ollama ollama pull gemma4:e4b
```

![Docker containers](TODO upload screenshots/docker-containers.png)

## Challenges

The biggest challenge was local model latency.

The scanner is fast, but local inference with a 9.6GB model is hardware-dependent. The first request can be slow because Ollama needs to load the model into memory.

I handled this by:

- increasing the Ollama request timeout
- adding a clearer loading state
- reducing prompt size
- validating AI output carefully

Another challenge was keeping the AI output predictable. Asking for JSON is not enough by itself, so the backend validates the response and normalizes safe optional fields.

## What I Learned

Local AI works well when the task is clearly bounded.

For this project, Gemma does not need to browse the web or guess what is on the page. The scanner gives it structured facts, and the model focuses on interpretation.

The pattern I liked most was:

```txt
deterministic extraction + local AI reasoning + strict validation
```

That feels like a practical way to use local models in developer tools.

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

## Repository

GitHub:

```txt
https://github.com/avi-aminov/local-ai-seo-agent
```

## Conclusion

Local AI SEO Agent shows how Gemma can power a real developer tool without relying on cloud AI APIs.

The project combines deterministic SEO scanning with local AI reasoning, validates the model output, and presents the result in a clean web UI.

