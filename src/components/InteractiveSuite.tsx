import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Percent,
  Receipt,
  FileCheck,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  DollarSign,
  Download,
  Sparkles
} from 'lucide-react';
import { CHECKLIST_DOCS } from '../data/finnacleData';

interface InteractiveSuiteProps {
  onOpenBooking: (servicePreselect?: string) => void;
}

export const InteractiveSuite: React.FC<InteractiveSuiteProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'tax-calc' | 'gst-reconciler' | 'fee-estimator' | 'doc-checklist'>('tax-calc');

  // --- 1. Tax Calculator State ---
  const [grossIncome, setGrossIncome] = useState<number>(1200000);
  const [sec80C, setSec80C] = useState<number>(150000);
  const [sec80D, setSec80D] = useState<number>(25000);
  const [hraExemption, setHraExemption] = useState<number>(60000);
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0);
  const [npsContribution, setNpsContribution] = useState<number>(50000);

  // Old Regime Tax Math
  const oldRegimeTax = useMemo(() => {
    const stdDeduction = 50000;
    const capped80C = Math.min(sec80C, 150000);
    const capped80D = Math.min(sec80D, 75000);
    const cappedHomeLoan = Math.min(homeLoanInterest, 200000);
    const cappedNps = Math.min(npsContribution, 50000);

    const totalDeductions = stdDeduction + capped80C + capped80D + hraExemption + cappedHomeLoan + cappedNps;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    let tax = 0;
    if (taxableIncome > 250000) {
      if (taxableIncome <= 500000) {
        tax += (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax += 250000 * 0.05 + (taxableIncome - 500000) * 0.20;
      } else {
        tax += 250000 * 0.05 + 500000 * 0.20 + (taxableIncome - 1000000) * 0.30;
      }
    }

    // 87A rebate for taxable income <= 500,000 in Old Regime
    if (taxableIncome <= 500000) {
      tax = 0;
    }

    // 4% Cess
    const cess = tax * 0.04;
    return {
      taxableIncome,
      totalDeductions,
      baseTax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(tax + cess)
    };
  }, [grossIncome, sec80C, sec80D, hraExemption, homeLoanInterest, npsContribution]);

  // New Regime Tax Math (Standard slabs, no 80C/80D/HRA, standard deduction 75,000)
  const newRegimeTax = useMemo(() => {
    const stdDeduction = 75000;
    const taxableIncome = Math.max(0, grossIncome - stdDeduction);

    let tax = 0;
    if (taxableIncome > 300000) {
      if (taxableIncome <= 700000) {
        tax += (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax += 400000 * 0.05 + (taxableIncome - 700000) * 0.10;
      } else if (taxableIncome <= 1200000) {
        tax += 400000 * 0.05 + 300000 * 0.10 + (taxableIncome - 1000000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax += 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + (taxableIncome - 1200000) * 0.20;
      } else {
        tax += 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + 300000 * 0.20 + (taxableIncome - 1500000) * 0.30;
      }
    }

    // Section 87A rebate in New Regime if taxable income <= 700,000
    if (taxableIncome <= 700000) {
      tax = 0;
    }

    const cess = tax * 0.04;
    return {
      taxableIncome,
      totalDeductions: stdDeduction,
      baseTax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(tax + cess)
    };
  }, [grossIncome]);

  const taxDifference = Math.abs(oldRegimeTax.totalTax - newRegimeTax.totalTax);
  const recommendedRegime = newRegimeTax.totalTax < oldRegimeTax.totalTax ? 'New Tax Regime' : 'Old Tax Regime';

  // --- 2. GST Reconciler State ---
  const [salesTurnover, setSalesTurnover] = useState<number>(2500000);
  const [salesGSTRate, setSalesGSTRate] = useState<number>(18);
  const [purchasesValue, setPurchasesValue] = useState<number>(1600000);
  const [purchaseGSTRate, setPurchaseGSTRate] = useState<number>(18);

  const gstCalculation = useMemo(() => {
    const outputTax = (salesTurnover * salesGSTRate) / 100;
    const inputCredit = (purchasesValue * purchaseGSTRate) / 100;
    const netGstPayable = Math.max(0, outputTax - inputCredit);
    const itcCarryForward = Math.max(0, inputCredit - outputTax);

    return {
      outputTax: Math.round(outputTax),
      inputCredit: Math.round(inputCredit),
      netGstPayable: Math.round(netGstPayable),
      itcCarryForward: Math.round(itcCarryForward)
    };
  }, [salesTurnover, salesGSTRate, purchasesValue, purchaseGSTRate]);

  // --- 3. Fee Estimator State ---
  const [entityType, setEntityType] = useState<'individual' | 'llp' | 'pvt_ltd' | 'enterprise'>('pvt_ltd');
  const [employeeCount, setEmployeeCount] = useState<number>(12);
  const [includeBookkeeping, setIncludeBookkeeping] = useState<boolean>(true);
  const [includeGstReturns, setIncludeGstReturns] = useState<boolean>(true);
  const [includePayroll, setIncludePayroll] = useState<boolean>(true);
  const [includeAnnualAudit, setIncludeAnnualAudit] = useState<boolean>(true);
  const [includeVcfo, setIncludeVcfo] = useState<boolean>(false);

  const feeEstimate = useMemo(() => {
    let base = 0;
    if (entityType === 'individual') base = 150;
    if (entityType === 'llp') base = 350;
    if (entityType === 'pvt_ltd') base = 550;
    if (entityType === 'enterprise') base = 1200;

    let monthly = 0;
    if (includeBookkeeping) monthly += base;
    if (includeGstReturns) monthly += entityType === 'individual' ? 80 : 180;
    if (includePayroll) monthly += Math.max(60, employeeCount * 8);
    if (includeVcfo) monthly += 750;

    let annualAddon = 0;
    if (includeAnnualAudit) {
      annualAddon = entityType === 'enterprise' ? 1800 : entityType === 'pvt_ltd' ? 950 : 450;
    }

    return {
      monthlyRetainer: monthly,
      annualTotal: monthly * 12 + annualAddon,
      annualAuditFee: annualAddon
    };
  }, [entityType, employeeCount, includeBookkeeping, includeGstReturns, includePayroll, includeAnnualAudit, includeVcfo]);

  // --- 4. Document Checklist State ---
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': true,
    'c5': true
  });
  const [checklistFilter, setChecklistFilter] = useState<'all' | 'individual' | 'business'>('all');

  const filteredDocs = CHECKLIST_DOCS.filter(d => checklistFilter === 'all' || d.category === checklistFilter);
  const totalChecked = filteredDocs.filter(d => checkedDocs[d.id]).length;
  const readinessPct = Math.round((totalChecked / (filteredDocs.length || 1)) * 100);

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="tax-tools" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Interactive Financial Suite</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Real-Time Advisory Estimators</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Compute Your Tax Liability, Reconcile GST, and Estimate Advisory Fees
          </h2>
          <p className="text-base text-slate-600">
            Transparent institutional calculations with zero guesswork. Use our real-time estimators below or have our chartered team review your custom numbers.
          </p>
        </div>

        {/* Tab Controls (Segmented clean control adhering to §1.A) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-fit mb-8 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('tax-calc')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tax-calc'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-slate-600" />
            <span>Old vs New Tax Regime</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gst-reconciler')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'gst-reconciler'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Percent className="w-4 h-4 text-slate-600" />
            <span>GST & ITC Reconciler</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fee-estimator')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'fee-estimator'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4 text-slate-600" />
            <span>Accounting Fee Estimator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('doc-checklist')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'doc-checklist'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4 text-slate-600" />
            <span>Audit & ITR Document Checklist</span>
          </button>
        </div>

        {/* Tab 1: Income Tax Liability Calculator */}
        {activeTab === 'tax-calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50/70 p-6 lg:p-8 rounded-2xl border border-slate-200">
            {/* Input Parameters (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="gross-income-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Annual Gross Income (Salary + Business + Capital Gains)
                  </label>
                  <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                    ${grossIncome.toLocaleString()}
                  </span>
                </div>
                <input
                  id="gross-income-input"
                  type="range"
                  min="300000"
                  max="5000000"
                  step="50000"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(Number(e.target.value))}
                  className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                  <span>$300,000</span>
                  <span>$2,500,000</span>
                  <span>$5,000,000</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                  Eligible Deductions (Applied to Old Tax Regime)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs text-slate-700 font-semibold">
                      <span>Section 80C (PPF/ELSS/PF)</span>
                      <span className="font-mono text-slate-900 tabular-nums">${sec80C.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="10000"
                      value={sec80C}
                      onChange={(e) => setSec80C(Number(e.target.value))}
                      className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block">Max limit: $150,000</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs text-slate-700 font-semibold">
                      <span>Section 80D (Health Insurance)</span>
                      <span className="font-mono text-slate-900 tabular-nums">${sec80D.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="75000"
                      step="5000"
                      value={sec80D}
                      onChange={(e) => setSec80D(Number(e.target.value))}
                      className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block">Self, Family & Parents</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs text-slate-700 font-semibold">
                      <span>HRA / Rent Exemption</span>
                      <span className="font-mono text-slate-900 tabular-nums">${hraExemption.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="240000"
                      step="10000"
                      value={hraExemption}
                      onChange={(e) => setHraExemption(Number(e.target.value))}
                      className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block">Exempt rent component</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs text-slate-700 font-semibold">
                      <span>Home Loan Interest (Sec 24b)</span>
                      <span className="font-mono text-slate-900 tabular-nums">${homeLoanInterest.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={homeLoanInterest}
                      onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                      className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block">Max limit: $200,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Comparison Panel (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Regime Comparison
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Optimal: {recommendedRegime}
                </span>
              </div>

              {/* Side by Side Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Old Regime Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  recommendedRegime === 'Old Tax Regime'
                    ? 'border-emerald-600 bg-emerald-50/30'
                    : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="text-xs font-semibold text-slate-600 mb-1">Old Regime</div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                    ${oldRegimeTax.totalTax.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2 space-y-1 border-t border-slate-200/60 pt-2 font-mono tabular-nums">
                    <div>Taxable: ${oldRegimeTax.taxableIncome.toLocaleString()}</div>
                    <div>Deductions: ${oldRegimeTax.totalDeductions.toLocaleString()}</div>
                    <div>Cess (4%): ${oldRegimeTax.cess.toLocaleString()}</div>
                  </div>
                </div>

                {/* New Regime Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  recommendedRegime === 'New Tax Regime'
                    ? 'border-emerald-600 bg-emerald-50/30'
                    : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="text-xs font-semibold text-slate-600 mb-1">New Regime</div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                    ${newRegimeTax.totalTax.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2 space-y-1 border-t border-slate-200/60 pt-2 font-mono tabular-nums">
                    <div>Taxable: ${newRegimeTax.taxableIncome.toLocaleString()}</div>
                    <div>Std Deduction: $75,000</div>
                    <div>Cess (4%): ${newRegimeTax.cess.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1.5">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Advisory Insight
                </div>
                <div className="text-sm font-semibold">
                  You save <span className="font-mono text-emerald-400 font-bold">${taxDifference.toLocaleString()}</span> by electing the {recommendedRegime}.
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  Our tax specialists structure advance capital gains harvesting and non-taxable perks to further compress this obligation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking('Income Tax Planning & Filing')}
                className="w-full py-3 px-4 text-xs font-semibold text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer font-sans shadow-xs"
              >
                <span>File ITR & Lock In Optimal Regime</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: GST & ITC Reconciler */}
        {activeTab === 'gst-reconciler' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50/70 p-6 lg:p-8 rounded-2xl border border-slate-200">
            {/* Outward & Inward Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    1. Outward Supplies (Monthly Sales Turnover)
                  </h4>
                  <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                    ${salesTurnover.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={salesTurnover}
                  onChange={(e) => setSalesTurnover(Number(e.target.value))}
                  className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-600">GST Slab:</span>
                  {[5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setSalesGSTRate(rate)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        salesGSTRate === rate
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    2. Inward Eligible Purchases (Raw Materials & Services)
                  </h4>
                  <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                    ${purchasesValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={purchasesValue}
                  onChange={(e) => setPurchasesValue(Number(e.target.value))}
                  className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-600">Input Tax Rate:</span>
                  {[5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setPurchaseGSTRate(rate)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        purchaseGSTRate === rate
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reconciliation Output (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
                Net Monthly GST Position
              </div>

              <div className="space-y-3 font-mono tabular-nums text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-sans text-slate-600">Output Tax Collected ({salesGSTRate}%):</span>
                  <span className="font-bold text-slate-900">${gstCalculation.outputTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-sans text-slate-600">Eligible Input Tax Credit (ITC):</span>
                  <span className="font-bold text-emerald-700">-${gstCalculation.inputCredit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 text-base font-bold text-slate-950 bg-slate-50 p-3 rounded-lg">
                  <span className="font-sans">Net Cash Payable:</span>
                  <span>${gstCalculation.netGstPayable.toLocaleString()}</span>
                </div>
                {gstCalculation.itcCarryForward > 0 && (
                  <div className="text-xs text-emerald-700 font-sans font-medium">
                    ITC Carry-Forward to next month: ${gstCalculation.itcCarryForward.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-500 space-y-1.5 pt-2">
                <p>
                  <strong className="text-slate-700">GSTR-2B Mismatch Shield:</strong> Finnacle runs automated reconciliation against the GST portal daily to detect vendor non-filers before your monthly cash flow is impacted.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking('Corporate Taxation & GST Compliance')}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Automate GST Filing & ITC Reconciliation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Transparent Fee Estimator */}
        {activeTab === 'fee-estimator' && (
          <div id="fee-estimator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50/70 p-6 lg:p-8 rounded-2xl border border-slate-200">
            {/* Configuration (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                  Select Legal Entity Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'individual', label: 'Freelancer / Sole Prop' },
                    { id: 'llp', label: 'LLP / Partnership' },
                    { id: 'pvt_ltd', label: 'Private Limited' },
                    { id: 'enterprise', label: 'Scale Enterprise' }
                  ].map((ent) => (
                    <button
                      key={ent.id}
                      type="button"
                      onClick={() => setEntityType(ent.id as any)}
                      className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        entityType === ent.id
                          ? 'border-slate-900 bg-white text-slate-950 shadow-xs ring-1 ring-slate-900'
                          : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      {ent.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Select Required Monthly Modules
                </label>

                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="text-xs font-medium text-slate-800">
                      End-to-End Bookkeeping & Bank Reconciliations (QuickBooks / Xero / Tally)
                    </span>
                    <input
                      type="checkbox"
                      checked={includeBookkeeping}
                      onChange={(e) => setIncludeBookkeeping(e.target.checked)}
                      className="w-4 h-4 accent-slate-900 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="text-xs font-medium text-slate-800">
                      Monthly GST Filings (GSTR-1, GSTR-3B) & E-Way Bill Oversight
                    </span>
                    <input
                      type="checkbox"
                      checked={includeGstReturns}
                      onChange={(e) => setIncludeGstReturns(e.target.checked)}
                      className="w-4 h-4 accent-slate-900 rounded"
                    />
                  </label>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-800">
                        Payroll & Statutory Deductions (TDS, PF, ESI)
                      </span>
                      <input
                        type="checkbox"
                        checked={includePayroll}
                        onChange={(e) => setIncludePayroll(e.target.checked)}
                        className="w-4 h-4 accent-slate-900 rounded"
                      />
                    </div>
                    {includePayroll && (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-500">Employee Headcount:</span>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="2"
                            max="150"
                            value={employeeCount}
                            onChange={(e) => setEmployeeCount(Number(e.target.value))}
                            className="w-32 accent-slate-900"
                          />
                          <span className="font-mono text-xs font-bold text-slate-900 tabular-nums w-8">
                            {employeeCount}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="text-xs font-medium text-slate-800">
                      Annual Tax Audit (Sec 44AB) & ROC Statutory Filing (AOC-4, MGT-7)
                    </span>
                    <input
                      type="checkbox"
                      checked={includeAnnualAudit}
                      onChange={(e) => setIncludeAnnualAudit(e.target.checked)}
                      className="w-4 h-4 accent-slate-900 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="text-xs font-medium text-slate-800 block">
                        Virtual CFO Retainer
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Weekly cash flow modeling, board packs & investor runway advisory
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeVcfo}
                      onChange={(e) => setIncludeVcfo(e.target.checked)}
                      className="w-4 h-4 accent-slate-900 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Estimated Pricing Card (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
                Transparent Advisory Pricing
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
                  <div className="text-xs text-slate-300 font-medium">Estimated Monthly Retainer</div>
                  <div className="text-3xl font-extrabold font-mono tabular-nums text-white">
                    ${feeEstimate.monthlyRetainer.toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal"> / month</span>
                  </div>
                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                    Includes dedicated account manager and chartered accountant dual sign-off.
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono tabular-nums text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-600">Annual Monthly Subtotal:</span>
                    <span>${(feeEstimate.monthlyRetainer * 12).toLocaleString()}</span>
                  </div>
                  {feeEstimate.annualAuditFee > 0 && (
                    <div className="flex justify-between">
                      <span className="font-sans text-slate-600">Year-End Audit & ROC Package:</span>
                      <span>+${feeEstimate.annualAuditFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                    <span className="font-sans">Estimated Annual Total:</span>
                    <span>${feeEstimate.annualTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking(`Custom Plan: ${entityType.toUpperCase()} ($${feeEstimate.monthlyRetainer}/mo)`)}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Request Formal Engagement Letter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Document Readiness Checklist */}
        {activeTab === 'doc-checklist' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50/70 p-6 lg:p-8 rounded-2xl border border-slate-200">
            {/* Checklist items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChecklistFilter('all')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      checklistFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    All Requirements
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklistFilter('individual')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      checklistFilter === 'individual' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    Individual / ITR
                  </button>
                  <button
                    type="button"
                    onClick={() => setChecklistFilter('business')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      checklistFilter === 'business' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    Corporate & Audit
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  {totalChecked} of {filteredDocs.length} collected
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredDocs.map((doc) => {
                  const isChecked = !!checkedDocs[doc.id];
                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDoc(doc.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-white border-emerald-400/80 shadow-2xs'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by div
                        className="mt-0.5 w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isChecked ? 'text-slate-900' : 'text-slate-700'}`}>
                            {doc.name}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {doc.importance}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Readiness Summary (4 cols) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
                Filing Readiness Score
              </div>

              <div className="text-center py-4 space-y-2">
                <div className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {readinessPct}%
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      readinessPct >= 80 ? 'bg-emerald-500' : readinessPct >= 50 ? 'bg-amber-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${readinessPct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600">
                  {readinessPct >= 80
                    ? 'Excellent readiness. We can file your return or close books within 48 hours.'
                    : 'A few critical documents are missing. Our team can help you pull missing TDS 26AS records.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Document Review & Fast-Track Filing')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
                >
                  Schedule Fast-Track Filing
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const text = filteredDocs.map(d => `[${checkedDocs[d.id] ? 'X' : ' '}] ${d.name} (${d.importance})`).join('\n');
                    const blob = new Blob([`FINNACLE ACCOUNTS SOLUTIONS - DOCUMENT READINESS\nGenerated: ${new Date().toLocaleDateString()}\n\n${text}`], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'finnacle_document_checklist.txt';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Checklist (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
