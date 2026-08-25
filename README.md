# Concordance ── Semantic Layer Documentation & Reconciliation

Welcome to **Concordance** ── a semantic layer documentation and reconciliation tool built for Power BI models. 

Unlike standard SaaS dashboards, Concordance is styled with a **monospace, dark-themed dev-tool aesthetic** (reminiscent of terminal interfaces). It helps data analysts, regulators, and developers automatically extract TMDL schemas, map dependencies, compile requirements validation documents, and reconcile Power BI metrics against a warehouse database (like DuckDB, Snowflake, or Databricks).

---

## 🛠️ The Team & Credits

This project was built by a collaborative, cross-functional team:
* **🎨 UI/UX Designer**: Crafted the high-density terminal layout, custom color-coded status badges, and precise typographic hierarchies utilizing monospace fallbacks.
* **💻 Frontend Architect**: Developed the React + TypeScript structure, rendering dynamic object dependency graphs and comparative code side-by-side diff blocks.
* **✍️ Technical Writer**: Authored the beginner-friendly onboarding guide explaining complex terms like TMDL, DAX, and cryptographic SHA-256 logic-fingerprints from scratch.

---

## 🚀 Key Features

* **Overview Panel**: Fast statistical counts of tables, columns, measures, joins, and hierarchies alongside extraction warning consoles.
* **Object Explorer Tree**: Searchable tree list of schema components. Expands child elements and maps DAX expressions, upstream inputs, and downstream impact breakage graphs.
* **Business Requirements**: Automatically formats requirements validation files (BRDs/FRDs) with confidence metrics (High/Medium/Low) and accordion toggles for bound properties.
* **Reconciliation Matrix**: Maps Power BI calculations directly against raw database views (SQL), checking inputs, aggregations, and highlighting schema mismatches (e.g. only-in columns).
* **Copilot Chat**: Conversational helper backed by the semantic map to answer model layout queries (such as what OOS Rate calculates or inactive joins) with zero hallucination.

---

## ⚙️ Tech Stack

* **Core**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS v4 (incorporating `@tailwindcss/vite` compiler hooks)
* **Icons**: Lucide Icons
* **Hosting**: Surge / Vercel static deployments

---

## 💻 Running Locally

To get Concordance running locally on your machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amulyapatil0107/concordance.git
   cd concordance
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite dev server**:
   ```bash
   npm run dev
   ```
   Open **http://localhost:5173** in your browser.

4. **Verify production compilation**:
   ```bash
   npm run build
   ```

---

## 🌐 Live Deployments

* **Live Demo**: You can access the fully working, live version of the project at **[concordance-qualitycontrol-971852.surge.sh](https://concordance-qualitycontrol-971852.surge.sh)**
