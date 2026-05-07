# API And Data Contracts

## Endpoint

```http
POST /api/analyze
Content-Type: application/json
```

Request:

```json
{
  "url": "https://example.com"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "scan": {},
    "analysis": {
      "score": 82,
      "summary": "The page has good SEO fundamentals but needs stronger metadata and image alt text.",
      "criticalIssues": [],
      "mediumIssues": [],
      "recommendations": [],
      "suggestedTitle": "Example Website - Clear Service Description",
      "suggestedMetaDescription": "A concise description of the page content and value."
    }
  }
}
```

Error response:

```json
{
  "success": false,
  "message": "Invalid URL"
}
```

## Status Codes

- `200`: analysis completed
- `400`: invalid input
- `422`: scanner or AI output could not be validated
- `500`: server error
- `503`: Ollama unavailable

## URL Validation

Accept:

- `http://`
- `https://`

Reject:

- missing URL
- malformed URL
- unsupported protocols
- localhost
- loopback IPs
- private network IPs
- empty domains

## Scanner Output Shape

```ts
export interface SeoScanResult {
  url: string;
  finalUrl: string;
  title: string;
  metaDescription: string;
  canonical: string | null;
  robots: string | null;
  viewport: string | null;
  headings: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', string[]>;
  images: {
    total: number;
    missingAlt: number;
    missingAltSamples: string[];
  };
  links: {
    internal: number;
    external: number;
    empty: number;
  };
  openGraph: {
    title: string | null;
    description: string | null;
    image: string | null;
    url: string | null;
  };
  schema: {
    count: number;
    types: string[];
  };
  content: {
    textLength: number;
    wordCount: number;
  };
}
```

## AI Output Shape

```ts
export interface SeoAiAnalysis {
  score: number;
  summary: string;
  criticalIssues: string[];
  mediumIssues: string[];
  recommendations: string[];
  suggestedTitle: string;
  suggestedMetaDescription: string;
}
```

## Prompt Requirements

The prompt must tell Gemma:

- return JSON only
- do not use markdown
- analyze only provided scanner data
- do not invent crawl data
- keep recommendations specific and actionable
- keep title under about 60 characters when possible
- keep meta description under about 160 characters when possible

## Ollama Request

```json
{
  "model": "gemma4:e4b",
  "prompt": "Generated SEO prompt here",
  "stream": false
}
```

Use environment variables:

```env
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=gemma4:e4b
```

Default model tag:

```txt
gemma4:e4b
```
