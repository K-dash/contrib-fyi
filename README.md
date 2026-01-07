<div align="center">
  <img src="web/app/logo.png" alt="Contrib.FYI Logo" width="150" height="150">
  <h1>Contrib.FYI</h1>
    Finding issues is easy. Deciding which ones are worth your time is not.
  <br><br>
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/Built%20with-Next.js-black" alt="Built with Next.js">
</div>

<div align="center">
  <h3>
    <a href="https://K-dash.github.io/contrib-fyi/"> 👉 Visit the Web App</a>
  </h3>
  <img width="1160" height="1012" alt="SS 2026-01-03 22 33 11" src="https://github.com/user-attachments/assets/5d14610e-c02f-4e83-ad52-e55eed73e638" />
</div>
<br/>

Finding meaningful open source issues is harder than it should be.

Contrib.FYI helps you find open source issues on GitHub while reducing the time wasted opening issues that are already being worked on.

## Why Contrib.FYI?

[github-help-wanted](https://github.com/mac-s-g/github-help-wanted/) offered an excellent experience.
Browsing issues in chronological order made it easy to discover projects
I would never have found otherwise.

Unfortunately, the service is no longer available.

While rebuilding that experience, I noticed another problem.

> **Finding issues is easy.  
> Deciding whether to work on them is expensive.**

Many issues already have:

- ongoing discussions
- linked pull requests
- contributors actively working on them

Opening those issues only to realize this costs time and attention.
Contrib.FYI keeps the discovery experience — but adds signals
to reduce wasted effort _before_ you click.

## What Contrib.FYI Does Differently

Contrib.FYI is designed to preserve one specific experience:
**serendipitous discovery**.

Browsing issues in chronological order creates opportunities to stumble upon
projects you were never explicitly looking for.
This kind of accidental discovery is difficult to achieve with static,
curated lists that surface the same popular repositories repeatedly.

Contrib.FYI embraces this idea through a dynamic search approach,
using live GitHub API data to reflect what is happening right now —
while adding signals that help you decide whether an issue is worth your time.

In practice, this means:

- Uses live GitHub API data
- Surfaces issues in real time
- Preserves chronological discovery
- Adds signals to reduce wasted effort

This is not about finding more issues.
It is about finding better candidates to spend your time on.

This design intentionally trades optimization for exploration.

## Key Features

### 🔍 Dynamic, Real-Time Search

Contrib.FYI directly queries the GitHub API.
What you see reflects what is happening right now, not a cached or curated snapshot.

This keeps discovery fresh and avoids the same well-known repositories dominating results.

### 🏷 Flexible Filtering

You can freely combine filters such as:

- Programming language
- Issue labels (e.g. `help wanted`, `good first issue`)
- Excluded keywords

This allows both broad exploration and focused searching.

### 🔐 GitHub Token Integration (Optional but Recommended)

By providing your own GitHub Personal Access Token (PAT), you unlock higher rate limits
and additional signals that help reduce wasted effort.

- API rate limit increases from 60 → 5,000 requests/hour
- Your token is stored only in your browser’s `localStorage`
- The token is never sent to any external server

#### Additional Signals (With Token)

These features exist for one purpose:
to avoid spending time on issues that are already being handled.

- **Repository star count**
  - Focus on projects that match your desired scale
- **Primary programming language**
  - Avoid skill mismatches
- **No comments filter**
  - Reduce the chance of ongoing discussion
- **No linked PRs filter**
  - Avoid issues already being worked on

Together, these signals help you make a decision before opening the issue.

### 🔖 My Picks

Interesting issues can be saved locally to your **My Picks** list.

This allows you to:

- collect candidates
- compare later
- return when you actually have time to work on them

All data is stored locally in your browser.

### Comparison

| Feature          | Contrib.FYI                    | Other Curated Sites          |
| ---------------- | ------------------------------ | ---------------------------- |
| Search Strategy  | Dynamic (Live GitHub Data)     | Static (Manual / Cron-based) |
| Discovery Style  | Chronological, serendipitous   | Popular repositories first   |
| Niche Languages  | Any                            | Major languages only         |
| Decision Signals | Stars, PRs, comments, language | Rarely available             |
| Save Issues      | Local storage (My Picks)       | Rarely supported             |

---

## Development

If you want to run this project locally or contribute to its development, follow the steps below.

### Prerequisites

- Node.js 20+ or compatible package manager
- (Optional) GitHub Personal Access Token for higher rate limits

### Installation

1. Clone the repository:

```bash
git clone https://github.com/contrib-fyi/contrib-fyi.git
cd contrib-fyi/web
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Configure environment variables:

```bash
cp .env.local.example .env.local
# NEXT_PUBLIC_BASE_PATH=/your/base/path
# NEXT_OUTPUT_MODE=export
# NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – serve the production build
- `npm run lint` – run ESLint
- `npm run format` – format with Prettier
- `npm run typecheck` – run TypeScript without emitting files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
