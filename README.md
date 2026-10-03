# Gautham Balasubramanian — Senior Lead AI Engineer Portfolio

A state-of-the-art, high-performance portfolio website built for **Gautham Balasubramanian** (Senior Lead AI Engineer with 9+ years of experience across Singapore and India, NUS Master's in Intelligent Systems).

This site is engineered with bespoke **Vanilla CSS**, semantic HTML5, and modular modern JavaScript bundled with **Vite**. It is preconfigured for zero-friction local execution as well as instant deployment to **Vercel**.

---

## Key Highlights & Features

- **Deep Obsidian & Cyberpunk-Executive Aesthetics**: Curated color palette (`#07090e` obsidian base, cyber cyan, electric violet, emerald accents) with high-fidelity glassmorphism (`backdrop-filter: blur(16px)`).
- **Interactive Neural & Embedding Canvas**: Live animated canvas in the hero background that visualizes multi-modal embeddings and network nodes responding to cursor movement.
- **Flagship Systems Deep Dive**:
  - **Unified Product Matching Platform (Staples India)**: Multi-modal embedding ensemble (CLIP + MPNET + MARQO-B) on Azure Databricks with an in-house fine-tuned QWEN-3 LLM re-ranker ($10M+ projected revenue, $3M EBITDA, +10% RPV lift).
  - **Interactive Architecture Flow Explorer**: Clickable stage-by-stage visualizer detailing ingestion, hybrid search, embedding fusion, LLM cross-encoder scoring, and assortment intelligence.
  - **Healthcare & Medical Vision (UCARE.AI)**: Orthokeratology Myopia corneal scan diagnostics, 80% STP efficiency in claims processing, 70% faster payouts, and hospital bill estimation deployed across Singapore hospital groups.
  - **Financial Intelligence (GIC Singapore / U3 Infotech)**: LLM analytics on complex financial filings, delivering 50% faster analysis.
  - **Predictive Ops & Banking Maintenance (NTT Data / DBS Bank)**: Log mining, automated RCA, and production REST APIs.
  - **Aviation Delay Modeling (TCS / IEEE Conference)**: Predictive ML published in IEEE Conference.
- **Skills Matrix with Dynamic Category Filters**: Filterable cards spanning AI/ML, Frameworks, Cloud & MLOps, Languages & Backend, and Data Visualization.
- **Synchronized Regional Clocks**: Live synchronized clocks for **Singapore (SGT / UTC+8)** and **India (IST / UTC+5:30)** highlighting his global cross-border track record.
- **Resume Action Center**: In-browser PDF preview modal with download button powered by `public/Gautham_CV.pdf`.
- **Responsive Navigation**: Full mobile navigation drawer and scroll spy with active link tracking.

---

## Running Locally

### Prerequisites
- Node.js (v18+ recommended; verified on Node v22)
- npm (v9+ or v10+)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000/
```

### Step 3: Build for Production
To create an optimized production build:
```bash
npm run build
```
The bundled static files will be generated in the `dist/` directory.

### Step 4: Preview Production Build
```bash
npm run preview
```

---

## Deploying to Vercel

The repository is already pre-configured for Vercel with a standard `vercel.json` and Vite build setup.

### Option A: Via Vercel Web Dashboard (Recommended)
1. Push this project folder to your GitHub / GitLab / Bitbucket repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import the repository.
4. Vercel automatically detects the **Vite** framework:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**. Your site will be live on a global edge CDN in seconds!

### Option B: Via Vercel CLI
1. Install the Vercel CLI globally if not already installed:
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command in the project root:
   ```bash
   vercel
   ```
3. For production deployment:
   ```bash
   vercel --prod
   ```

---

## Project Structure

```
gautham_portfolio/
├── Gautham_CV.pdf        # Original resume source
├── public/
│   └── Gautham_CV.pdf    # Statically served resume for browser preview & download
├── src/
│   ├── main.js           # Interactive logic, canvas, simulator, clocks, chat
│   └── style.css         # Bespoke design system, glassmorphism, responsive CSS
├── dist/                 # Production build output
├── index.html            # Semantic HTML5 layout with SEO tags
├── package.json          # Vite scripts & dev dependencies
├── vite.config.js        # Vite build & dev server configuration
├── vercel.json           # Vercel deployment & cache routing configuration
└── README.md             # Documentation
```

---

## License & Attribution
Designed and built for **Gautham Balasubramanian** (2026). All project details and career achievements are based on his verified professional curriculum vitae.
