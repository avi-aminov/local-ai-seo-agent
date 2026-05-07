# MVP Scope

## Included

The MVP includes one complete workflow:

```txt
Enter URL -> scan page -> analyze with local Gemma -> show SEO report
```

Required features:

- single URL input
- backend URL validation
- single-page HTML fetch
- SEO signal extraction
- local Ollama/Gemma call
- structured AI JSON validation
- report UI
- loading and error states
- Docker Compose setup

## SEO Scanner Must Extract

Basic metadata:

- title
- meta description
- canonical URL
- robots meta
- viewport meta

Headings:

- h1 through h6
- count per level
- text values, trimmed

Images:

- total images
- missing alt count
- sample images with missing alt

Links:

- internal count
- external count
- empty or hash-only count

Social and structured data:

- Open Graph title, description, image, URL
- JSON-LD schema count

Content:

- visible text length
- estimated word count

## AI Must Generate

Gemma returns JSON with:

- `score`: number from 0 to 100
- `summary`: short SEO summary
- `criticalIssues`: high-priority issue list
- `mediumIssues`: medium-priority issue list
- `recommendations`: actionable improvements
- `suggestedTitle`: SEO-friendly title
- `suggestedMetaDescription`: SEO-friendly description

## Not Included

Do not build these for the MVP:

- authentication
- database
- saved reports
- multi-page crawling
- sitemap crawling
- browser extension
- WordPress plugin
- scheduled scans
- PDF export
- payments
- teams or user accounts
- AI chat
- competitor analysis
- Lighthouse integration
- JavaScript rendering with Puppeteer

## MVP Success Criteria

The MVP is done when:

- a user can analyze a real public URL
- scanner data is extracted correctly
- Gemma returns useful structured recommendations
- invalid URLs fail cleanly
- Ollama failures show readable errors
- the UI works on desktop and mobile
- the project can run locally with Docker
- screenshots can be taken for the DEV submission

