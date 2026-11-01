import { ServiceItem, CaseStudy, Testimonial, TaxDeadline, ChecklistDoc } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'income-tax',
    category: 'tax',
    title: 'Income Tax Planning & Filing',
    shortDesc: 'Strategic tax structuring, comprehensive ITR preparation, capital gains optimization, and foreign asset disclosures.',
    deliverables: [
      'Individual & HNI tax return preparation (ITR-1 through ITR-4)',
      'Capital gains computations across equities, mutual funds & real estate',
      'Advance tax estimation & quarterly installment scheduling',
      'Old vs New Regime tax efficiency comparative modeling',
      'Double Taxation Avoidance Agreement (DTAA) & NRI taxation'
    ],
    keyBenefit: 'Average 18.4% reduction in effective individual tax liability through proactive legal deductions',
    idealFor: 'Salaried executives, professionals, consultants, HNIs, and angel investors',
    image: '/src/assets/images/consultant_advisory_session_1793514943212.jpg'
  },
  {
    id: 'corporate-taxation-gst',
    category: 'corporate',
    title: 'Corporate Taxation & GST Compliance',
    shortDesc: 'End-to-end indirect tax compliance, monthly GST returns, Input Tax Credit (ITC) maximization, and corporate tax computation.',
    deliverables: [
      'Monthly GSTR-1, GSTR-3B filings & annual GSTR-9/9C reconciliations',
      'Input Tax Credit (ITC) audit to eliminate leakage & vendor non-compliance',
      'Corporate Tax computation (Form 29B, MAT & Section 115BAA)',
      'E-Way bill automation & e-invoicing API integration oversight',
      'Representation for GST department notices, summons & audit audits'
    ],
    keyBenefit: 'Zero late filing penalties and 100% matched input tax credit reconciliation',
    idealFor: 'Trading firms, manufacturers, D2C brands, and tech service enterprises',
    image: '/src/assets/images/corporate_audit_meeting_1793514942316.jpg'
  },
  {
    id: 'bookkeeping-accounting',
    category: 'accounting',
    title: 'Full-Scale Bookkeeping & Cloud Accounting',
    shortDesc: 'Institutional-grade ledger maintenance, multi-currency bank reconciliations, payroll administration, and monthly management reporting.',
    deliverables: [
      'Daily/weekly transaction categorization in QuickBooks, Zoho Books, Xero or Tally',
      'Multi-currency accounts payable & receivable workflows',
      'Monthly closing pack: P&L, Balance Sheet, Cash Flow & variance commentary',
      'Payroll processing including statutory PF, ESI, TDS and PT compliance',
      'Fixed asset register maintenance with statutory depreciation schedules'
    ],
    keyBenefit: 'Month-end book close accelerated from 16 days to under 4 business days',
    idealFor: 'Growing SMBs, agencies, e-commerce brands, and VC-funded startups',
    image: '/src/assets/images/accounting_technology_dashboard_1793514943384.jpg'
  },
  {
    id: 'financial-consultancy-vcfo',
    category: 'consultancy',
    title: 'Strategic Financial Consultancy & Virtual CFO',
    shortDesc: 'High-level executive financial advisory, runway forecasting, working capital optimization, and investor due diligence support.',
    deliverables: [
      '13-week rolling cash flow forecasting & working capital stress testing',
      'Unit economics modeling (CAC, LTV, contribution margins by product line)',
      'Fundraising data room setup, financial model audits & 409A/DCF valuations',
      'Banking relationship management, debt syndication & credit line structuring',
      'Monthly Board of Directors financial presentation & KPI dashboards'
    ],
    keyBenefit: 'Executive CFO caliber guidance at ~30% the overhead of a full-time in-house executive',
    idealFor: 'Seed to Series B startups, family offices, and mid-market growth companies'
  },
  {
    id: 'statutory-audit-compliance',
    category: 'corporate',
    title: 'Statutory Audits & Regulatory Compliance',
    shortDesc: 'Comprehensive statutory audit readiness, ROC/MCA company secretarial compliance, and internal financial controls review.',
    deliverables: [
      'Tax Audit reports under Section 44AB (Form 3CA/3CB and 3CD)',
      'Transfer pricing documentation & Master File compliance for cross-border transactions',
      'ROC annual filing (AOC-4, MGT-7), director KYC & secretarial records',
      'Internal Financial Controls (IFC) testing and risk matrix assessment',
      'Response drafting for faceless scrutiny assessments & rectification petitions'
    ],
    keyBenefit: 'Bulletproof regulatory defense with 99.4% first-round notice clearance',
    idealFor: 'Incorporated Private Limited companies, LLPs, and foreign subsidiaries'
  }
];

export const TAX_DEADLINES: TaxDeadline[] = [
  {
    id: 'dl-1',
    title: 'GSTR-3B Monthly Return Filing',
    category: 'GST',
    dueDate: '20th of every month',
    description: 'Summary return of outward supplies, input tax credit claimed, and net tax payment in cash.',
    penaltyWarning: '$50/day late fee + 18% p.a. interest on delayed tax liabilities.',
    frequency: 'Monthly'
  },
  {
    id: 'dl-2',
    title: 'TDS / TCS Monthly Deposit',
    category: 'TDS',
    dueDate: '7th of subsequent month',
    description: 'Statutory deposit of tax deducted at source on contractor payments, salaries, rent, and professional fees.',
    penaltyWarning: '1.5% interest per month from date of deduction until actual deposit.',
    frequency: 'Monthly'
  },
  {
    id: 'dl-3',
    title: 'Advance Tax Installment (Q3)',
    category: 'Income Tax',
    dueDate: 'December 15',
    description: 'Cumulative 75% payment of estimated total tax liability for companies and individual taxpayers.',
    penaltyWarning: 'Mandatory penal interest under Section 234C (1% per month on shortfall).',
    frequency: 'Quarterly'
  },
  {
    id: 'dl-4',
    title: 'Advance Tax Final Installment (Q4)',
    category: 'Income Tax',
    dueDate: 'March 15',
    description: '100% settlement of estimated annual tax liability before financial year close.',
    penaltyWarning: 'Section 234B & 234C interest penalties apply if advance payment < 90% of assessed tax.',
    frequency: 'Quarterly'
  },
  {
    id: 'dl-5',
    title: 'Individual & Non-Audit Tax Return (ITR)',
    category: 'Income Tax',
    dueDate: 'July 31',
    description: 'Annual Income Tax Return filing for salaried individuals, consultants, and non-audit business entities.',
    penaltyWarning: 'Up to $5,000 late fee under Section 234F plus loss of carry-forward loss eligibility.',
    frequency: 'Annual'
  },
  {
    id: 'dl-6',
    title: 'Corporate Tax Audit & Corporate ITR Filing',
    category: 'Income Tax',
    dueDate: 'October 31',
    description: 'Mandatory filing of audited books, Form 3CD tax audit report, and corporate income tax return.',
    penaltyWarning: '0.5% of turnover (up to $1,500) penalty for non-filing of Tax Audit report.',
    frequency: 'Annual'
  },
  {
    id: 'dl-7',
    title: 'Annual ROC Compliance (AOC-4 & MGT-7)',
    category: 'Corporate ROC',
    dueDate: 'November 29',
    description: 'Filing of audited financial statements and annual return with Registrar of Companies (MCA).',
    penaltyWarning: '$100 per day additional filing fee per document with director disqualification risk.',
    frequency: 'Annual'
  }
];

export const CHECKLIST_DOCS: ChecklistDoc[] = [
  {
    id: 'c1',
    name: 'Form 16 / Salary Certificates & Payslips',
    category: 'individual',
    importance: 'Mandatory',
    description: 'TDS certificate issued by employer showing gross remuneration, allowances, and tax withheld.'
  },
  {
    id: 'c2',
    name: 'Consolidated Bank Statements (All Accounts)',
    category: 'individual',
    importance: 'Mandatory',
    description: 'Complete 12-month statements for savings, current, and foreign bank holdings showing interest earned.'
  },
  {
    id: 'c3',
    name: 'Capital Gains Tax Statements (Brokers & Exchanges)',
    category: 'individual',
    importance: 'Conditional',
    description: 'Annual P&L reports for equity shares, mutual funds, crypto, and ESOP vesting transactions.'
  },
  {
    id: 'c4',
    name: 'Proof of Deductions (Section 80C, 80D, NPS, Home Loan)',
    category: 'individual',
    importance: 'Mandatory',
    description: 'Health insurance premium receipts, PPF receipts, ELSS statements, and bank housing loan interest certificate.'
  },
  {
    id: 'c5',
    name: 'Audited Financial Statements & Trial Balance',
    category: 'business',
    importance: 'Mandatory',
    description: 'Complete balance sheet, profit & loss statement, notes to accounts, and general ledger export.'
  },
  {
    id: 'c6',
    name: 'GST Sales & Purchase Registers (GSTR-2B Reconciled)',
    category: 'business',
    importance: 'Mandatory',
    description: 'Monthly summary of outward supplies and input tax credit claims verified against portal ledger.'
  },
  {
    id: 'c7',
    name: 'TDS Returns & Quarterly Form 26AS / AIS Reports',
    category: 'business',
    importance: 'Mandatory',
    description: 'Challan payment receipts, quarterly 24Q/26Q acknowledgements, and vendor withholding ledgers.'
  },
  {
    id: 'c8',
    name: 'Statutory Registers & Board Resolutions',
    category: 'business',
    importance: 'Supporting',
    description: 'Minutes of AGM, register of directors/shareholders, and sanctions for loans or major investments.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    clientType: 'Precision Engineering Manufacturer',
    sector: 'Manufacturing & Industrial Components',
    headline: 'Unlocked $142,000 in Stranded Input Tax Credits',
    challenge: 'A multi-tier industrial manufacturer was bleeding cash due to un-reconciled supplier GST invoices, vendor mismatches in GSTR-2B, and delayed input tax credit claims across 4 states.',
    solution: 'Finnacle deployed an automated three-way invoice matching protocol, resolved 412 legacy vendor discrepancies, and filed revised reconciliation claims.',
    metric: '$142,500',
    metricContext: 'Cash tax credits recovered within 90 days with zero audit objections'
  },
  {
    id: 'cs-2',
    clientType: 'B2B SaaS Scale-Up',
    sector: 'Software & Cloud Services',
    headline: 'Accelerated Month-End Books & Closed $4.2M Series A',
    challenge: 'The company was operating on disconnected spreadsheets, lagging 6 weeks behind on bookkeeping, and facing severe due diligence scrutiny during their institutional funding round.',
    solution: 'We restructured their chart of accounts into cloud-native QuickBooks, automated deferred revenue recognition (ASC 606), and delivered clean audited historical financials.',
    metric: '3 Business Days',
    metricContext: 'Standard monthly closing cycle achieved (down from 42 days)'
  },
  {
    id: 'cs-3',
    clientType: 'Multi-Asset HNI Family Office',
    sector: 'Private Wealth & Real Estate',
    headline: 'Structured Capital Gains Across Real Estate & Private Equity',
    challenge: 'Client faced a potential $380,000 capital gains tax bill following a major commercial property sale and secondary startup equity liquidation in the same fiscal year.',
    solution: 'Constructed an integrated reinvestment structure utilizing statutory exemptions (Sec 54EC capital gains bonds & targeted residential rollovers) paired with loss harvesting.',
    metric: '44% Net Savings',
    metricContext: 'Reduction in overall tax burden while maintaining 100% statutory compliance'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Vikramaditya Singhania',
    role: 'Managing Director',
    company: 'Singhania Industrial Dynamics Ltd.',
    quote: 'Finnacle Accounts Solutions took complete ownership of our corporate taxation and multi-state GST filing. Their foresight saved our treasury from massive input credit reversals and cleared two historical scrutiny notices without any penalty.',
    outcome: 'Eliminated $190K in potential tax penalties over 3 fiscal years',
    year: 'Client since 2021'
  },
  {
    id: 't-2',
    author: 'Elena Rostova',
    role: 'Chief Operating Officer & Co-Founder',
    company: 'OmniFlow Logistics Tech',
    quote: 'As our startup scaled across 8 regional warehouses, our bookkeeping was falling apart. Finnacle stepped in as our Virtual CFO, synced our warehouse inventory with cloud accounting, and delivered spotless financials that impressed our venture investors.',
    outcome: 'Streamlined multi-state GST and passed Series A financial audit without a single reservation',
    year: 'Client since 2023'
  },
  {
    id: 't-3',
    author: 'David R. Vance, CFA',
    role: 'Principal Investor',
    company: 'Apex Crest Capital',
    quote: 'The team at Finnacle provides rare depth in both individual tax planning and complex corporate structuring. Their tax planning advice for our high-net-worth partners has been indispensable during equity exits.',
    outcome: 'Structured over $12M in capital allocations with maximum tax efficiency',
    year: 'Client since 2019'
  }
];

export const PRACTICE_METRICS = [
  { label: 'Tax Optimized for Clients', value: '$48M+', detail: 'Calculated across legitimate statutory exemptions and credits' },
  { label: 'On-Time Compliance Record', value: '99.8%', detail: 'Zero late filing notices across all client portfolios' },
  { label: 'Active Corporate & HNI Clients', value: '1,400+', detail: 'From pre-seed ventures to $50M+ industrial enterprises' },
  { label: 'Years of Practice Excellence', value: '18+', detail: 'Led by certified chartered accountants and senior tax advisors' }
];

export const FAQS = [
  {
    q: 'How does Finnacle handle the Old vs New Tax Regime choice for individuals?',
    a: 'We perform a side-by-side quantitative simulation of your gross salary, business revenue, eligible Chapter VI-A deductions (80C, 80D, 80CCD), housing loan interest, and HRA exemptions to recommend the exact regime that leaves the highest post-tax cash in your pocket.'
  },
  {
    q: 'Can Finnacle help if we have received an Income Tax scrutiny notice or GST summons?',
    a: 'Yes. Our senior tax advocacy team specializes in responding to scrutiny notices under faceless assessment regimes, drafting detailed legal submissions with supporting documentation, and filing rectification or appellate applications.'
  },
  {
    q: 'What cloud accounting platforms do your specialists support?',
    a: 'We are certified implementation partners across QuickBooks Online, Zoho Books, Xero, and Tally Prime. We also build custom data pipelines to sync Shopify, Stripe, Razorpay, and enterprise ERP systems directly into your general ledger.'
  },
  {
    q: 'What is included in your Virtual CFO service package?',
    a: 'Our Virtual CFO engagement covers weekly cash flow monitoring, 13-week runway forecasts, monthly board reporting packs, unit economics optimization, working capital debt management, and direct participation in executive leadership reviews.'
  }
];
