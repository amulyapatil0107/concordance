// Mock Data aligned with reference screenshots for "QualityControl" Power BI model

export interface Dependency {
  name: string;
  type: 'table' | 'column' | 'measure';
  path: string;
}

export interface ModelObject {
  id: string;
  name: string;
  type: 'column' | 'measure' | 'table';
  tableName: string;
  formula?: string;
  cleanedFormula?: string;
  fingerprint?: string;
  upstream: Dependency[];
  downstream: Dependency[];
  description?: string;
}

export interface TableItem {
  name: string;
  hasMeasures: boolean;
  childCount: number;
  children: { name: string; type: 'column' | 'measure' }[];
}

export interface Requirement {
  id: string;
  textHtml: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  rule: string;
  explanation: string;
  boundObjects: string[];
}

export interface CodePanel {
  label: string;
  code: string;
  readsTables: string[];
  readsColumns: string[];
  aggregates: string[];
}

export interface ReconcileMetric {
  name: string;
  status: 'consistent' | 'needs review' | 'divergent';
  powerBi: CodePanel;
  warehouse: CodePanel;
  callout: string;
}

export interface ReviewItem {
  id: string;
  textHtml: string;
  rule: string;
  explanation: string;
  mapping: string;
  hash: string;
}

export const OVERVIEW_STATS = {
  tables: 6,
  columns: 38,
  measures: 20,
  joins: 6,
  hierarchies: 4,
  needsReview: 1
};

export const UNRESOLVED_SECTION = {
  warningText: "Everything this adapter understands was read, and every reference in the model resolved to an object that exists."
};

export const AWAITING_CONFIRMATION: Requirement[] = [
  {
    id: "REQ-B-58c38b",
    textHtml: "An alternate, inactive relationship between <strong>Batch</strong> and <strong>Calendar</strong> shall be available for calculations that explicitly invoke it.",
    confidence: "LOW",
    rule: "Dimensional analysis",
    explanation: "The relationship is present but inactive, so it only applies where a calculation activates it deliberately. Its intended use case is not recorded in the model and needs confirmation.",
    boundObjects: ["Batch.BatchStartDate", "Calendar.DateKey"]
  }
];

export const TABLES_TREE: TableItem[] = [
  {
    name: "Batch",
    hasMeasures: false,
    childCount: 12,
    children: [
      { name: "BatchID", type: "column" },
      { name: "BatchStartDate", type: "column" },
      { name: "BatchEndDate", type: "column" },
      { name: "ProductID", type: "column" },
      { name: "ManufactureDate", type: "column" },
      { name: "Status", type: "column" },
      { name: "ActualYield", type: "column" },
      { name: "TheoreticalYield", type: "column" },
      { name: "OperatorID", type: "column" },
      { name: "FacilityID", type: "column" },
      { name: "LineNumber", type: "column" },
      { name: "ShiftCode", type: "column" }
    ]
  },
  {
    name: "Calendar",
    hasMeasures: false,
    childCount: 5,
    children: [
      { name: "DateKey", type: "column" },
      { name: "Date", type: "column" },
      { name: "DayOfWeek", type: "column" },
      { name: "Month", type: "column" },
      { name: "Year", type: "column" }
    ]
  },
  {
    name: "Product",
    hasMeasures: false,
    childCount: 6,
    children: [
      { name: "ProductID", type: "column" },
      { name: "ProductName", type: "column" },
      { name: "Category", type: "column" },
      { name: "Price", type: "column" },
      { name: "SKU", type: "column" },
      { name: "SpecsLink", type: "column" }
    ]
  },
  {
    name: "QC Metrics",
    hasMeasures: true,
    childCount: 21,
    children: [
      { name: "OOS Rate", type: "measure" },
      { name: "Tests Performed", type: "measure" },
      { name: "OOS Results", type: "measure" },
      { name: "Batch Yield %", type: "measure" },
      { name: "Assay Mean", type: "measure" },
      { name: "Average Days To Release", type: "measure" },
      { name: "Batch Rejection Rate", type: "measure" },
      { name: "Batches By Release Date", type: "measure" },
      { name: "Batches Released", type: "measure" },
      { name: "Calibration Compliance %", type: "measure" },
      { name: "Dissolution Pass Rate", type: "measure" },
      { name: "Instrument Failure Rank", type: "measure" },
      { name: "Mean Deviation From Spec", type: "measure" },
      { name: "OOS Results PM", type: "measure" },
      { name: "OOS Variance vs PM", type: "measure" },
      { name: "Quality Status", type: "measure" },
      { name: "Right First Time %", type: "measure" },
      { name: "Tests On Uncalibrated Instruments", type: "measure" },
      { name: "Total Batches", type: "measure" },
      { name: "Active Products", type: "measure" },
      { name: "Total Sites", type: "measure" }
    ]
  },
  {
    name: "Site",
    hasMeasures: false,
    childCount: 6,
    children: [
      { name: "SiteID", type: "column" },
      { name: "SiteName", type: "column" },
      { name: "SiteLocation", type: "column" },
      { name: "SiteCoordinates", type: "column" },
      { name: "Region", type: "column" },
      { name: "Country", type: "column" }
    ]
  },
  {
    name: "TestResult",
    hasMeasures: false,
    childCount: 12,
    children: [
      { name: "TestID", type: "column" },
      { name: "BatchID", type: "column" },
      { name: "SiteID", type: "column" },
      { name: "ProductID", type: "column" },
      { name: "DurationSeconds", type: "column" },
      { name: "Temperature", type: "column" },
      { name: "Status", type: "column" },
      { name: "RunNumber", type: "column" },
      { name: "ResultStatus", type: "column" },
      { name: "operator_id", type: "column" },
      { name: "test_date", type: "column" },
      { name: "test_type", type: "column" }
    ]
  }
];

export const OBJECT_DETAILS: Record<string, ModelObject> = {
  "OOS Rate": {
    id: "measure:QC Metrics.OOS Rate",
    name: "OOS Rate",
    type: "measure",
    tableName: "QC Metrics",
    formula: "OOS Rate = DIVIDE([OOS Results], [Tests Performed], 0)",
    cleanedFormula: "DIVIDE(\n  [OOS Results],\n  [Tests Performed],\n  0\n)",
    fingerprint: "sha256:d8a2bc5f19ce9287c88b902ae8e7df09ef2b8a05c6d5b0aef1c2de95fef1095d",
    description: "Calculates the proportion of Out-Of-Specification tests relative to total tests performed.",
    upstream: [
      { name: "OOS Results", type: "measure", path: "QC Metrics/OOS Results" },
      { name: "Tests Performed", type: "measure", path: "QC Metrics/Tests Performed" }
    ],
    downstream: [
      { name: "Batch Yield %", type: "measure", path: "QC Metrics/Batch Yield %" }
    ]
  },
  "Tests Performed": {
    id: "measure:QC Metrics.Tests Performed",
    name: "Tests Performed",
    type: "measure",
    tableName: "QC Metrics",
    formula: "Tests Performed = COUNTROWS('TestResult')",
    cleanedFormula: "COUNTROWS('TestResult')",
    fingerprint: "sha256:a7b8c2d119ee948bc88b9a2be7e7df09ef2b8a04c6d5b0aef1c2de95fef1066c",
    description: "Counts total records in the TestResult table.",
    upstream: [
      { name: "TestResult", type: "table", path: "TestResult" }
    ],
    downstream: [
      { name: "OOS Rate", type: "measure", path: "QC Metrics/OOS Rate" }
    ]
  },
  "OOS Results": {
    id: "measure:QC Metrics.OOS Results",
    name: "OOS Results",
    type: "measure",
    tableName: "QC Metrics",
    formula: "OOS Results = CALCULATE(COUNTROWS('TestResult'), 'TestResult'[ResultStatus] = \"Failed\")",
    cleanedFormula: "CALCULATE(\n  COUNTROWS('TestResult'),\n  'TestResult'[ResultStatus] = \"Failed\"\n)",
    fingerprint: "sha256:c119ee948bc88b9a2be7e7df09ef2b8a04c6d5b0aef1c2de95fef1066cd32e8",
    description: "Counts total test results flagged with a Failed result status.",
    upstream: [
      { name: "TestResult", type: "table", path: "TestResult" },
      { name: "ResultStatus", type: "column", path: "TestResult/ResultStatus" }
    ],
    downstream: [
      { name: "OOS Rate", type: "measure", path: "QC Metrics/OOS Rate" }
    ]
  },
  "Batch Yield %": {
    id: "measure:QC Metrics.Batch Yield %",
    name: "Batch Yield %",
    type: "measure",
    tableName: "QC Metrics",
    formula: "Batch Yield % = DIVIDE(SUM(Batch[ActualYield]), SUM(Batch[TheoreticalYield]), BLANK())",
    cleanedFormula: "DIVIDE(\n  SUM(Batch[ActualYield]),\n  SUM(Batch[TheoreticalYield]),\n  BLANK()\n)",
    fingerprint: "sha256:e88f02ae8e7df09ef2b8a05c6d5b0aef1c2de95fef1095dd8a2bc5f19ce9287c",
    description: "Represents the ratio of manufactured actual yield output against planned theoretical yield values.",
    upstream: [
      { name: "Batch", type: "table", path: "Batch" },
      { name: "ActualYield", type: "column", path: "Batch/ActualYield" },
      { name: "TheoreticalYield", type: "column", path: "Batch/TheoreticalYield" }
    ],
    downstream: []
  }
};

export const REQUIREMENTS: Requirement[] = [
  {
    id: "REQ-B-3327b8",
    textHtml: "Users shall be able to analyse <strong>Batch</strong> by attributes of <strong>Site</strong>.",
    confidence: "MEDIUM",
    rule: "Dimensional analysis",
    explanation: "An active M-1 relationship joins Batch[SiteID] to Site[SiteID], which makes this slicing possible. The business purpose is inferred from the model's shape rather than stated by it.",
    boundObjects: ["Batch.SiteID", "Site.SiteID"]
  },
  {
    id: "REQ-B-58c38b",
    textHtml: "An alternate, inactive relationship between <strong>Batch</strong> and <strong>Calendar</strong> shall be available for calculations that explicitly invoke it.",
    confidence: "LOW",
    rule: "Dimensional analysis",
    explanation: "The relationship is present but inactive, so it only applies where a calculation activates it deliberately. Its intended use case is not recorded in the model and needs confirmation.",
    boundObjects: ["Batch.BatchStartDate", "Calendar.DateKey"]
  },
  {
    id: "REQ-B-5fa915",
    textHtml: "Users shall be able to analyse <strong>Batch</strong> by attributes of <strong>Calendar</strong>.",
    confidence: "MEDIUM",
    rule: "Dimensional analysis",
    explanation: "An active M-1 relationship joins Batch[ManufactureDate] to Calendar[Date], which makes this slicing possible. The business purpose is inferred from the model's shape rather than stated by it.",
    boundObjects: ["Batch.ManufactureDate", "Calendar.Date"]
  },
  {
    id: "REQ-B-8d7957",
    textHtml: "Users shall be able to analyse <strong>TestResult</strong> by attributes of <strong>Batch</strong>.",
    confidence: "MEDIUM",
    rule: "Dimensional analysis",
    explanation: "An active M-1 relationship joins TestResult[BatchID] to Batch[BatchID], which makes this slicing possible. The business purpose is inferred from the model's shape rather than stated by it.",
    boundObjects: ["TestResult.BatchID", "Batch.BatchID"]
  }
];

export const RECONCILE_METRICS: ReconcileMetric[] = [
  {
    name: "OOS Rate",
    status: "divergent",
    powerBi: {
      label: "POWER_BI (dax)",
      code: "DIVIDE([OOS Results], [Tests Performed], 0)",
      readsTables: ["TestResult"],
      readsColumns: ["ResultStatus"],
      aggregates: ["COUNT"]
    },
    warehouse: {
      label: "WAREHOUSE (sql)",
      code: "CREATE VIEW oos_rate AS SELECT (CAST(count_star() FILTER (WHERE\n(tr.result_status = 'Failed')) AS DOUBLE) / nullif((SELECT\ncount_star() FROM batch), 0)) AS oos_rate FROM test_result AS tr;",
      readsTables: ["batch", "test_result"],
      readsColumns: ["result_status"],
      aggregates: ["COUNT"]
    },
    callout: "source tables  power_bi reads ['testresult']; warehouse reads ['batch', 'testresult']"
  },
  {
    name: "Batch Yield %",
    status: "needs review",
    powerBi: {
      label: "POWER_BI (dax)",
      code: "DIVIDE(SUM(Batch[ActualYield]), SUM(Batch[TheoreticalYield]),\nBLANK())",
      readsTables: ["Batch"],
      readsColumns: ["ActualYield", "TheoreticalYield"],
      aggregates: ["SUM"]
    },
    warehouse: {
      label: "WAREHOUSE (sql)",
      code: "CREATE VIEW batch_yield_pct AS SELECT avg(CAST(b.actual_yield AS\nDOUBLE) / nullif(b.theoretical_yield, 0)) AS batch_yield_pct FROM\nbatch AS b;",
      readsTables: ["batch"],
      readsColumns: ["actual_yield", "theoretical_yield"],
      aggregates: ["AVG"]
    },
    callout: "source tables  power_bi reads ['batch']; warehouse reads ['batch']"
  },
  {
    name: "Tests Performed",
    status: "consistent",
    powerBi: {
      label: "POWER_BI (dax)",
      code: "COUNTROWS(TestResult)",
      readsTables: ["TestResult"],
      readsColumns: ["none identifiable"],
      aggregates: ["COUNT"]
    },
    warehouse: {
      label: "WAREHOUSE (sql)",
      code: "CREATE VIEW tests_performed AS SELECT count_star() AS tests_performed\nFROM test_result;",
      readsTables: ["test_result"],
      readsColumns: ["none identifiable"],
      aggregates: ["COUNT"]
    },
    callout: "source tables  power_bi reads ['testresult']; warehouse reads ['testresult']"
  },
  {
    name: "Total Batches",
    status: "consistent",
    powerBi: {
      label: "POWER_BI (dax)",
      code: "DISTINCTCOUNT(Batch[BatchID])",
      readsTables: ["Batch"],
      readsColumns: ["BatchID"],
      aggregates: ["DISTINCTCOUNT"]
    },
    warehouse: {
      label: "WAREHOUSE (sql)",
      code: "SELECT COUNT(DISTINCT batch_id) FROM quality_control.batch;",
      readsTables: ["batch"],
      readsColumns: ["batch_id"],
      aggregates: ["COUNT"]
    },
    callout: "source tables  power_bi reads ['batch']; warehouse reads ['batch']"
  },
  {
    name: "Active Products",
    status: "consistent",
    powerBi: {
      label: "POWER_BI (dax)",
      code: "CALCULATE(DISTINCTCOUNT(Product[ProductID]), Product[Status] = \"Active\")",
      readsTables: ["Product"],
      readsColumns: ["ProductID", "Status"],
      aggregates: ["DISTINCTCOUNT"]
    },
    warehouse: {
      label: "WAREHOUSE (sql)",
      code: "SELECT COUNT(DISTINCT product_id) FROM quality_control.product WHERE status = 'Active';",
      readsTables: ["product"],
      readsColumns: ["product_id", "status"],
      aggregates: ["COUNT"]
    },
    callout: "source tables  power_bi reads ['product']; warehouse reads ['product']"
  },
  {
    name: "Total Sites",
    status: "consistent",
    powerBi: {
      label: "POWER_BI (dax)",
      code: "COUNTROWS(Site)",
      readsTables: ["Site"],
      readsColumns: ["none identifiable"],
      aggregates: ["COUNT"]
    },
    warehouse: {
      label: "WAREHOUSE (sql)",
      code: "SELECT COUNT(*) FROM quality_control.site;",
      readsTables: ["site"],
      readsColumns: ["none identifiable"],
      aggregates: ["COUNT"]
    },
    callout: "source tables  power_bi reads ['site']; warehouse reads ['site']"
  }
];

export const RECONCILE_ONLY_POWERBI = [
  "Assay Mean",
  "Average Days To Release",
  "Batch Rejection Rate",
  "Batches By Release Date",
  "Batches Released",
  "Calibration Compliance %",
  "Dissolution Pass Rate",
  "Instrument Failure Rank",
  "Mean Deviation From Spec",
  "OOS Results PM",
  "OOS Variance vs PM",
  "Quality Status",
  "Right First Time %",
  "Tests On Uncalibrated Instruments"
];

export const RECONCILE_ONLY_WAREHOUSE = [
  "instrument_utilisation"
];

export const REVIEW_QUEUE: ReviewItem[] = [
  {
    id: "REQ-B-58c38b",
    textHtml: "An alternate, inactive relationship between <strong>Batch</strong> and <strong>Calendar</strong> shall be available for calculations that explicitly invoke it.",
    rule: "Dimensional analysis",
    explanation: "The relationship is present but inactive, so it only applies where a calculation activates it deliberately. Its intended use case is not recorded in the model and needs confirmation.",
    mapping: "table:Batch -> table:Calendar",
    hash: "58c38b"
  }
];

export const COPILOT_RESPONSES: Record<string, string> = {
  "what does oos rate measure?": `**OOS Rate** measures the ratio of Out-Of-Specification (OOS) tests to total tests performed. 
  
Formula:
\`\`\`dax
OOS Rate = DIVIDE([OOS Results], [Tests Performed], 0)
\`\`\`

It depends upstream on \`[OOS Results]\` and \`[Tests Performed]\` in the **QC Metrics** table, and impacts the downstream measure \`[Batch Yield %]\`.`,

  "what breaks if i change tests performed?": `If you modify or delete **Tests Performed**, the following **downstream items** in the semantic layer will break:

1. **OOS Rate** (measure): Uses \`[Tests Performed]\` as its denominator.
2. **Batch Yield %** (measure): Indirectly affected as it is calculated in relation to OOS Rate dynamics.
3. **Right First Time %** (measure): Reads \`[Tests Performed]\` for ratio calculations.

Additionally, reconciling with the warehouse metric \`SELECT COUNT(*) FROM quality_control.test_result\` will fail.`,

  "which joins are inactive?": `Checking extraction metadata...
  
There is **1 inactive relationship** in the extracted TMDL model:
- The join path between \`Batch\` and \`Calendar\` (\`Batch.BatchStartDate\` -> \`Calendar.DateKey\`) is marked **inactive**. It has been flagged in **REQ-B-58c38b** (Dimensional analysis) because it requires explicit activation inside DAX measures (e.g. using USERELATIONSHIP) and lacks clear descriptive metadata.`
};
