# Beyond the Bubble

> **See beyond your information bubble.**

An interactive media-literacy platform that helps users understand their information environment, recognize limited viewpoint diversity, and explore broader perspectives on complex topics.

---

## What It Does

Most people consume news and opinion through algorithmically curated feeds that optimize for engagement — not balance. Beyond the Bubble simulates that experience, then makes the bias visible.

Users walk through a guided journey:

1. **Pick a topic** — AI & Jobs, Climate Change, or Social Media & Mental Health
2. **Choose a feed type** — select content formats (news articles, short-form video, opinion posts, etc.) and attention types (strong opinions, data & research, personal stories, etc.)
3. **See the simulated feed** — a realistic 10-item feed constructed to mirror how algorithmic bias concentrates viewpoints
4. **Get a diversity score** — a normalized Shannon entropy score (0–100) breaks down viewpoint, source, and content diversity
5. **Explore missing perspectives** — deep-dive into the viewpoints underrepresented in the feed
6. **Take the media literacy challenge** — a 4-question quiz testing recognition of emotional framing, opinion vs evidence, source credibility, and missing context
7. **Reflect** — close the loop with a reflection exercise and a takeaway habit

No account required. No data stored. Everything runs in a browser session.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Tailwind CSS v4, Recharts, Motion |
| Backend | Node.js 22, Express 4, TypeScript 5.8 |
| Dev server | `tsx` (TypeScript execute), Vite 6 (frontend HMR via Express middleware) |
| Database | MongoDB via Mongoose (optional — app runs fully offline without it) |
| Validation | Zod |
| Build | Vite (frontend), esbuild (server bundle) |
| Security | Helmet, CORS (environment-aware) |

---

## Project Structure

```
beyond-bubble/
├── server.ts                  # Entry point — starts Express + Vite dev middleware
├── server/src/
│   ├── app.ts                 # Express app factory
│   ├── config/
│   │   ├── database.ts        # MongoDB connection (graceful offline mode)
│   │   └── env.ts             # Zod-validated environment config
│   ├── controllers/           # Route handlers with Zod input validation
│   │   ├── analysisController.ts
│   │   ├── challengeController.ts
│   │   ├── healthController.ts
│   │   ├── perspectiveController.ts
│   │   ├── simulationController.ts
│   │   └── topicController.ts
│   ├── data/                  # Hardcoded seed content (~80KB total)
│   │   ├── seedChallenges.ts  # 4 media literacy quiz questions
│   │   ├── seedContent.ts     # Simulated feed articles for all 3 topics
│   │   └── seedPerspectives.ts # Detailed perspective profiles
│   ├── middleware/
│   │   ├── errorHandler.ts    # Global error handler
│   │   └── security.ts        # Helmet + CORS + body limits
│   ├── models/                # Mongoose schemas (Topic, Content, Challenge)
│   ├── routes/                # Express routers (one per feature domain)
│   ├── services/              # Business logic layer
│   │   ├── analysisService.ts  # Shannon entropy diversity scoring
│   │   ├── challengeService.ts # Quiz retrieval + server-side scoring
│   │   ├── perspectiveService.ts
│   │   ├── simulationService.ts # Deterministic feed construction
│   │   └── topicService.ts
│   └── utils/
│       └── entropy.ts         # Normalized Shannon entropy math
├── src/                       # React frontend
│   ├── App.tsx                # Router setup
│   ├── components/            # Feature-organized UI components
│   │   ├── analysis/          # Diversity score charts & breakdowns
│   │   ├── challenge/         # Quiz cards & results
│   │   ├── explore/           # Topic selection & preference picker
│   │   ├── feed/              # Simulated feed cards
│   │   ├── landing/           # Home page sections
│   │   ├── layout/            # Navbar, Footer, JourneyProgress
│   │   ├── perspectives/      # Perspective detail & comparison views
│   │   ├── reflection/        # Reflection questions & summary
│   │   └── ui/                # Shared primitives (Button, Card, Badge, etc.)
│   ├── hooks/                 # API-connected React hooks
│   │   ├── useChallenge.ts
│   │   ├── usePerspectiveAnalysis.ts
│   │   ├── usePerspectiveExplorer.ts
│   │   ├── useReflection.ts
│   │   ├── useSimulatedFeed.ts
│   │   └── useTopics.ts
│   ├── pages/                 # One component per route
│   ├── services/api.ts        # Fetch wrappers for all backend endpoints
│   └── utils/
│       └── session.ts         # sessionStorage helpers for journey state
├── shared/
│   ├── constants.ts           # Topics, routes, perspective categories (shared FE+BE)
│   └── types.ts               # All TypeScript interfaces (shared FE+BE)
└── .env                       # Local environment config (not committed)
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (tested on v22)
- **npm** 9+ (or Bun if preferred)

MongoDB is **optional** — the app runs completely offline using built-in seed data.

### 1. Clone and install

```bash
git clone <repo-url>
cd beyond-bubble
npm install
```

### 2. Configure environment

Copy the example and edit as needed:

```bash
cp .env.example .env
```

The defaults work out of the box for local development:

```env
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000

# Leave blank to run in offline seed-data mode
MONGODB_URI=
```

### 3. Start the dev server

```bash
npm run dev
```

The server starts at **[http://localhost:3000](http://localhost:3000)**

Both the Express API and the Vite frontend dev server run on the same port. HMR (hot module replacement) is active for the React frontend.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Express + Vite HMR on port 3000) |
| `npm run build` | Build frontend with Vite and bundle server with esbuild |
| `npm run start` | Run the production build (`dist/server.cjs`) |
| `npm run lint` | TypeScript type-check without emitting files |

---

## API Reference

All endpoints are prefixed with `/api`.

### Health

```
GET /api/health
```

Returns server status, uptime, environment, and database connection state.

```json
{
  "status": "ok",
  "timestamp": "2026-08-16T12:00:00.000Z",
  "uptimeSeconds": 142,
  "environment": "development",
  "database": { "connected": false, "state": "unconfigured" },
  "version": "0.1.0"
}
```

---

### Topics

```
GET /api/topics
```

Returns all available exploration topics.

```json
{
  "topics": [
    {
      "id": "ai-jobs",
      "name": "AI & Jobs",
      "description": "How artificial intelligence may change work, skills and employment.",
      "icon": "Bot",
      "tags": ["Automation", "Labor Market", "Reskilling", "Future of Work"],
      "perspectiveCount": 6,
      "featured": true
    }
  ],
  "source": "fallback",
  "total": 3
}
```

---

### Simulation

```
POST /api/simulation/feed
Content-Type: application/json

{
  "topicId": "ai-jobs",
  "selectedContentFormats": ["news-articles", "expert-research"],
  "selectedAttentionTypes": ["data-research", "strong-opinions"]
}
```

Returns a deterministic 10-item simulated feed shaped by the user's content preferences and the topic's built-in perspective distribution.

**topicId** (required): `ai-jobs` | `climate-change` | `social-media-mental-health`

**selectedContentFormats** (optional): `short-form-videos` | `news-articles` | `opinion-posts` | `educational-content` | `expert-research`

**selectedAttentionTypes** (optional): `strong-opinions` | `practical-advice` | `data-research` | `personal-stories` | `breaking-news`

---

### Analysis

```
POST /api/analysis
Content-Type: application/json

{
  "simulationId": "sim_ai-jobs_abc123",
  "feed": [ ...SimulatedContentItem[] ]
}
```

Computes the Perspective Diversity Score for a given feed using normalized Shannon entropy across three dimensions:

| Dimension | Weight | Measures |
|---|---|---|
| Viewpoint diversity | 50% | Distribution across named perspectives |
| Source diversity | 30% | Distribution across source types |
| Content diversity | 20% | Distribution across content framings |

Returns an overall score (0–100), per-dimension scores, dominant/underrepresented perspectives, and an interpretation label.

---

### Perspectives

```
GET /api/perspectives/:topicId
```

Returns all perspective profiles for a topic (name, description, key themes, critical questions, comparison data).

```
GET /api/perspectives/:topicId/:perspective
```

Returns full detail for a single perspective.

```
GET /api/perspectives/:topicId/:perspective/content
```

Returns representative simulated content items for that perspective.

**Example**: `GET /api/perspectives/ai-jobs/worker-perspective`

---

### Media Literacy Challenge

```
GET /api/challenges
```

Returns 4 challenge questions covering emotional framing, opinion vs evidence, source credibility, and missing context.

```
POST /api/challenges/submit
Content-Type: application/json

{
  "answers": {
    "q1": "b",
    "q2": "a",
    "q3": "c",
    "q4": "b"
  }
}
```

Scoring happens entirely server-side. Returns score, per-concept breakdown, question reviews with explanations, and a takeaway habit.

---

## How the Diversity Score Works

The score uses **Normalized Shannon Entropy** — the same mathematical concept used in information theory to measure how unpredictable (diverse) a distribution is.

```
H = -Σ(p_i × ln(p_i))        # Shannon entropy
D = H / ln(n)                  # Normalized by theoretical max (n = distinct categories)
Score = D × 100                # 0–100 scale
```

- **0** = single perspective dominates the entire feed
- **100** = all perspectives appear with perfectly equal frequency

The three dimensions are combined as a weighted average:

```
Overall = (Viewpoint × 0.5) + (Source × 0.3) + (Content × 0.2)
```

Score bands:

| Range | Label |
|---|---|
| 0–24 | Highly concentrated |
| 25–49 | Moderately concentrated |
| 50–74 | Relatively diverse |
| 75–100 | Highly diverse |

---

## Database (Optional)

The app runs fully offline using hardcoded seed data — no database setup is needed to run or develop locally.

If you want to connect MongoDB (for persistence or extending with new topics):

1. Create a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
2. Add your connection string to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/beyond-bubble?retryWrites=true&w=majority
   ```
3. Restart the server — collections are seeded automatically on first run

The app will automatically seed topics, content, and challenges into MongoDB if the collections are empty, and fall back to local seed data gracefully if the connection fails.

---

## Perspective Categories

Every piece of content is tagged with one of six neutral perspective categories:

| Category | Focus |
|---|---|
| **Civic & Regulatory** | Governance, public policy, consumer rights, legal frameworks |
| **Academic & Research** | Empirical studies, peer-reviewed data, scientific methodology |
| **Industry & Economic** | Market innovation, business sustainability, capital investment |
| **Community & Grassroots** | Lived experiences, localized impact, marginalized communities |
| **Ethics & Philosophy** | Moral implications, long-term societal values, human agency |
| **Workforce & Labor** | Employment conditions, wage stability, skill transitions |

No perspective category is weighted as more or less valid — the platform measures exposure, not ideology.

---

## Production Build

```bash
npm run build
npm run start
```

This builds the React frontend with Vite into `dist/`, then bundles `server.ts` with esbuild into `dist/server.cjs`. The production server serves the static frontend and handles API requests on the same port.

Set environment variables before running in production:

```env
NODE_ENV=production
PORT=3000
APP_URL=https://yourdomain.com
MONGODB_URI=<your-atlas-uri>    # optional
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and run `npm run lint` to verify types
4. Commit and push, then open a pull request

To add a new topic, add entries to:
- `shared/constants.ts` — `INITIAL_TOPICS` array
- `server/src/data/seedContent.ts` — simulated content items
- `server/src/data/seedPerspectives.ts` — perspective profiles
- `server/src/services/simulationService.ts` — perspective quota for the feed constructor

---

## License

MIT
