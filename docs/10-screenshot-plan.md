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
recommendations.png
docker-containers.png
```

## Required Shots

## Homepage

URL:

```txt
http://localhost:5174
```

Capture the URL form before running analysis.

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
- issues

Save as:

```txt
screenshots/report.png
```

## Recommendations

Scroll to recommendations and suggested metadata.

Save as:

```txt
screenshots/recommendations.png
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
![Recommendations](screenshots/recommendations.png)
```

