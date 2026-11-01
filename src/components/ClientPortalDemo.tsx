import React, { useState } from 'react';
import { ShieldCheck, FileSpreadsheet, Lock, UploadCloud, CheckCircle2, FileText, Download } from 'lucide-react';

export const ClientPortalDemo: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'Form_16_FY2024_Signed.pdf',
    'Bank_Statement_Q3_Consolidated.xlsx'
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [viewDoc, setViewDoc] = useState<'computation' | 'pl'>('computation');

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFiles((prev) => [fileName, ...prev]);
        setIsUploading(false);
      }, 700);
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Client Workspace Experience</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>256-Bit Encrypted Vault</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Real-Time Accounting Visibility & Secure Document Vault
          </h2>
          <p className="text-base text-slate-600">
            Every Finnacle client receives dedicated access to their compliance health matrix, verified tax filings, and audited ledger reports.
          </p>
        </div>

        {/* Portal Mockup Frame */}
        <div className="rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 shadow-xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>vault.finnacleaccounts.com/client-console</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Encrypted Session</span>
            </div>
          </div>

          {/* Portal Interior */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Status Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Compliance Health</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-base font-bold text-white">100% Up-To-Date</span>
                </div>
                <p className="text-[11px] text-slate-400">All monthly GST & TDS filed</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Assigned Lead Consultant</span>
                <div className="text-base font-bold text-white">Arunabh Mehta, FCA</div>
                <p className="text-[11px] text-slate-400">Senior Partner, Corporate Taxation</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Next Milestone</span>
                <div className="text-base font-bold text-amber-300">Advance Tax Installment</div>
                <p className="text-[11px] text-slate-400">Auto-calculated by Finnacle</p>
              </div>
            </div>

            {/* Split: Document Vault Upload & Financial Statement Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Upload Vault (5 cols) */}
              <div className="lg:col-span-5 bg-slate-800/60 p-5 rounded-xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Client Secure Upload Box
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {uploadedFiles.length} files secured
                  </span>
                </div>

                <label className="border-2 border-dashed border-slate-600 hover:border-slate-400 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-900/40">
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-200">
                    {isUploading ? 'Encrypting & uploading...' : 'Drop bank statements or invoices'}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Supports PDF, Excel, CSV, Scans (up to 50MB)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleSimulatedUpload}
                    disabled={isUploading}
                  />
                </label>

                <div className="space-y-2">
                  <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    Recent Verified Records
                  </div>
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 text-xs border border-slate-700"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-slate-300 truncate">{file}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Report Preview (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewDoc('computation')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        viewDoc === 'computation'
                          ? 'bg-amber-400 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Tax Computation Statement
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewDoc('pl')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        viewDoc === 'pl'
                          ? 'bg-amber-400 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Management P&L Summary
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert('Sample report exported to clipboard for your review.');
                    }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>

                {viewDoc === 'computation' ? (
                  <div className="bg-slate-900/90 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800 tabular-nums">
                    <div className="text-slate-400 text-[11px] pb-1 border-b border-slate-800 flex justify-between">
                      <span>FINNACLE ACCOUNTS SOLUTIONS — TAX COMPUTATION SHEET</span>
                      <span>ASSESSMENT YEAR 2025-26</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Gross Total Income (Head II & IV):</span>
                      <span className="text-white font-bold">$1,850,000.00</span>
                    </div>
                    <div className="flex justify-between py-1 text-emerald-400">
                      <span>Less: Chapter VI-A Statutory Exemptions:</span>
                      <span>-$275,000.00</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-slate-800 text-white font-semibold">
                      <span>Taxable Net Income:</span>
                      <span>$1,575,000.00</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Assessed Base Tax on Income:</span>
                      <span>$282,500.00</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Health & Education Cess @ 4%:</span>
                      <span>$11,300.00</span>
                    </div>
                    <div className="flex justify-between py-1 text-emerald-400">
                      <span>Less: Prepaid Advance Tax & TDS:</span>
                      <span>-$293,800.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-slate-700 text-emerald-300 font-bold text-sm">
                      <span>Net Tax Payable / (Refund Due):</span>
                      <span>$0.00 (Zero Outstanding)</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900/90 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800 tabular-nums">
                    <div className="text-slate-400 text-[11px] pb-1 border-b border-slate-800 flex justify-between">
                      <span>FINNACLE ACCOUNTS SOLUTIONS — CONSOLIDATED P&L</span>
                      <span>MONTHLY CLOSING: OCTOBER</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Operating Revenue (Net of GST):</span>
                      <span className="text-white font-bold">$412,800.00</span>
                    </div>
                    <div className="flex justify-between py-1 text-rose-300">
                      <span>Cost of Goods & Direct Supplies:</span>
                      <span>-$178,400.00</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-slate-800 text-white font-semibold">
                      <span>Gross Profit (56.8% Margin):</span>
                      <span>$234,400.00</span>
                    </div>
                    <div className="flex justify-between py-1 text-rose-300">
                      <span>Operating Expenses (Payroll, Rent, Tech):</span>
                      <span>-$142,600.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-slate-700 text-amber-300 font-bold text-sm">
                      <span>EBITDA (Operating Surplus):</span>
                      <span>$91,800.00 (22.2%)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
