# Local AI SEO Agent Docs

This folder is the working documentation for the project.

The old long-form planning files were moved to:

```txt
docs/_archive-original-docs/
```

Use the current files in this order:

1. [00-contest-requirements.md](00-contest-requirements.md) - what the Gemma 4 Challenge requires.
2. [01-product-brief.md](01-product-brief.md) - what we are building and why.
3. [02-mvp-scope.md](02-mvp-scope.md) - what is in the MVP and what is intentionally excluded.
4. [03-architecture-and-stack.md](03-architecture-and-stack.md) - system design, stack, folder structure.
5. [04-api-and-data-contracts.md](04-api-and-data-contracts.md) - API, scanner output, AI output.
6. [05-implementation-plan.md](05-implementation-plan.md) - step-by-step build plan.
7. [06-local-setup.md](06-local-setup.md) - install, run, verify.
8. [07-submission-guide.md](07-submission-guide.md) - DEV post, screenshots, judging checklist.
9. [08-task-checklist.md](08-task-checklist.md) - executable task list with project status.
10. [09-devto-article-draft.md](09-devto-article-draft.md) - draft DEV challenge submission.
11. [10-screenshot-plan.md](10-screenshot-plan.md) - exact screenshot checklist.

Current project direction:

```txt
URL -> SEO scan -> Gemma via Ollama -> structured AI report -> React UI
```

Main rule: Gemma must do real work in the product. The project should not be a thin wrapper or a static demo.
