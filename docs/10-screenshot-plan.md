# Screenshot Plan

Save final screenshots in:

```txt
screenshots/
```

Use these filenames:

```txt
homepage.png
loading.png
report.png
runtime-cache.png
health-badges.png
recommendations.png
export-actions.png
docker-containers.png
```

## Required Shots

## Homepage

URL:

```txt
http://localhost:5174
```

Capture the URL form before running analysis.

Make sure the Fast / Quality mode selector is visible.

Save as:

```txt
screenshots/homepage.png
```

## Loading

Run analysis for:

```txt
https://www.zohocorp.com/
```

Capture the loading state while Gemma is running.

Save as:

```txt
screenshots/loading.png
```

## Completed Report

After analysis completes, capture the top of the report showing:

- score
- summary
- runtime badges
- Fast / Quality model used
- Copy report and Download JSON buttons

Save as:

```txt
screenshots/report.png
```

## Runtime And Cache

Run the same URL twice in the same mode.

Capture the second result showing:

- Cache Hit
- low runtime values
- model and prompt version

Save as:

```txt
screenshots/runtime-cache.png
```

## SEO Health Badges

Capture the section showing deterministic SEO health badges:

- Metadata
- Headings
- Images
- Schema
- Open Graph
- Content

Save as:

```txt
screenshots/health-badges.png
```

## Recommendations

Scroll to recommendations and suggested metadata.

Save as:

```txt
screenshots/recommendations.png
```

## Export Actions

Capture the report top or action area showing:

- Copy report
- Download JSON

Save as:

```txt
screenshots/export-actions.png
```

## Docker Containers

Capture Docker Desktop or terminal output showing:

```bash
docker compose ps
```

Save as:

```txt
screenshots/docker-containers.png
```

## README Links

After screenshots exist, add them to `README.md`.

Recommended Markdown:

```md
## Screenshots

![Homepage](screenshots/homepage.png)
![SEO report](screenshots/report.png)
![Runtime and cache](screenshots/runtime-cache.png)
![SEO health badges](screenshots/health-badges.png)
![Recommendations](screenshots/recommendations.png)
```
