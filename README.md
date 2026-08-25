# Concordance ── Semantic Layer Documentation & Reconciliation

Welcome to **Concordance** ── a semantic layer documentation and reconciliation tool built for Power BI models. 

Unlike standard SaaS dashboards, Concordance is styled with a **monospace, dark-themed dev-tool aesthetic** (reminiscent of terminal interfaces). It helps data analysts, regulators, and developers automatically extract TMDL schemas, map dependencies, compile requirements validation documents, and reconcile Power BI metrics against a warehouse database (like DuckDB, Snowflake, or Databricks).

---

## 🚀 Key Features

* **Overview Panel**: Fast statistical counts of tables, columns, measures, joins, and hierarchies alongside extraction warning consoles.
* **Object Explorer Tree**: Searchable tree list of schema components. Expands child elements and maps DAX expressions, upstream inputs, and downstream impact breakage graphs.
* **Business Requirements**: Automatically formats requirements validation files (BRDs/FRDs) with confidence metrics (High/Medium/Low) and accordion toggles for bound properties.
* **Reconciliation Matrix**: Maps Power BI calculations directly against raw database views (SQL), checking inputs, aggregations, and highlighting schema mismatches (e.g. only-in columns).
* **Copilot Chat**: Conversational helper backed by the semantic map to answer model layout queries (such as what OOS Rate calculates or inactive joins) with zero hallucination.
