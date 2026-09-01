# On-Call Assistant

This repository demonstrates SenseTheLog wired across an entire GitHub Actions pipeline. The workflow runs `lint`, `test`, and `build` independently, then runs one `analyze` job only when at least one of those jobs fails.

## Setup

1. Create a repository secret named `SENSETHELOG_API_KEY`.
2. Push this repository to GitHub with `main` as the default branch.
3. Open `.github/workflows/on-call-assistant.yml` in the Actions tab as **On-Call Assistant**.

The secret belongs in GitHub repository settings, not in a committed file. The workflow references it with `${{ secrets.SENSETHELOG_API_KEY }}`.

The workflow permissions are intentionally limited to:

- `contents: read` for checkout
- `actions: read` for workflow run logs
- `pull-requests: write` for SenseTheLog PR comments

## Local Commands

Run commands from `app`:

```bash
npm ci
npm run lint
npm test
npm run build
```

## Failure Controls

Use these tiny edits to create repeatable failures for the exercise:

- Break only tests: change `return left + right;` in `app/src/calculator.js` to `return left - right;`.
- Break lint too: add `// BREAK_LINT` anywhere in `app/src/calculator.js`.
- Break build on a direct push: add `// BREAK_BUILD` anywhere in `app/src/calculator.js`.

## Run Log

Record the live GitHub results here.

| Run | Trigger | Run URL | SenseTheLog result |
| --- | --- | --- | --- |
| 1 | Pull request, all jobs passing | TODO | `analyze` is skipped. This is visible in the run summary visualization graph and job list because `lint`, `test`, and `build` passed, so the `analyze` job condition evaluated false. |
| 2 | Same pull request, test broken only | TODO | TODO: record the PR comment, including SenseTheLog's stated root cause and suggested fix. |
| 3 | Same pull request, test and lint broken | TODO | TODO: confirm the single `analyze` job summarized both failed jobs together, rather than separate analyze jobs/comments. |
| 4 | Same pull request, lint and test fixed | TODO | TODO: confirm all jobs pass and the existing SenseTheLog PR comment updates instead of a duplicate being added. |
| 5 | Fresh branch/PR with the same Run 2 test bug | TODO | TODO: record `is-recurring`, whether `notify-on-recurrence` ran, and its printed message. |
| 6 | Direct push to `main`, build broken | TODO | TODO: record where the analysis appears in the Actions run summary because there is no pull request comment target. |
