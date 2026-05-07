# Product Brief

## Project Name

```txt
Local AI SEO Agent
```

## One-Line Description

A local AI-powered SEO audit tool that scans a webpage and uses Gemma through Ollama to generate a structured SEO report.

## Problem

SEO tools often depend on cloud services, external APIs, paid plans, and remote AI providers. For developers, agencies, and privacy-sensitive site owners, that creates cost, latency, privacy, and vendor-lock concerns.

## Solution

The user enters a URL. The app scans the page HTML, extracts SEO signals, sends structured data to Gemma running locally, and displays a practical SEO report.

Core flow:

```txt
URL -> HTML scan -> SEO data -> Gemma analysis -> report UI
```

## Target Users

- developers checking landing pages before launch
- small agencies doing quick technical audits
- indie builders improving SEO without cloud AI
- open-source developers interested in local AI workflows

## Main Value

- runs locally
- avoids cloud AI APIs
- gives actionable recommendations
- demonstrates real Gemma usage
- works as a clean portfolio and contest project

## MVP User Story

As a user, I can enter a public website URL and receive:

- overall SEO score
- short summary
- critical issues
- medium issues
- recommended fixes
- suggested title
- suggested meta description
- raw scan highlights

## Product Principles

- Keep the MVP focused on one-page SEO analysis.
- Make Gemma central to the recommendation layer.
- Keep scanner logic deterministic and AI logic structured.
- Keep the UI professional and easy to understand.
- Prefer working software over broad feature lists.

