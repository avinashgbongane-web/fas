import React from 'react';

interface FooterProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Positioning (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-base font-bold text-white tracking-tight block">
              Finnacle Accounts Solutions
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Comprehensive income tax planning, indirect corporate taxation, full-lifecycle accounting, and strategic financial consultancy for growth enterprises, partnerships, and high-net-worth individuals.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono space-y-1">
              <div>Financial District · Suite 1400</div>
              <div>Direct: +1 (800) 346-6225 · advisory@finnacleaccounts.com</div>
            </div>
          </div>

          {/* Solutions Directory */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Statutory Solutions
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('Income Tax Planning & Filing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Income Tax & ITR Filing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('Corporate Taxation & GST Compliance')}
                  className="hover:text-white transition-colors text-left"
                >
                  Corporate Taxation & GST
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('Full-Scale Bookkeeping & Cloud Accounting')}
                  className="hover:text-white transition-colors text-left"
                >
                  Full-Scale Bookkeeping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('Strategic Financial Consultancy & Virtual CFO')}
                  className="hover:text-white transition-colors text-left"
                >
                  Virtual CFO & Advisory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('Statutory Audits & Regulatory Compliance')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tax Audit & ROC Filings
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Calculators & Tools
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#tax-tools" className="hover:text-white transition-colors">
                  Old vs New Regime Calculator
                </a>
              </li>
              <li>
                <a href="#tax-tools" className="hover:text-white transition-colors">
                  GST & ITC Reconciler
                </a>
              </li>
              <li>
                <a href="#fee-estimator" className="hover:text-white transition-colors">
                  Accounting Fee Estimator
                </a>
              </li>
              <li>
                <a href="#tax-tools" className="hover:text-white transition-colors">
                  ITR Document Checklist
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">
                  Statutory Tax Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Standards */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Practice Integrity
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>Chartered Accountant Oversight</li>
              <li>Dual-Review Audit Shield</li>
              <li>256-bit Encrypted Client Vault</li>
              <li>Zero-Penalty Guarantee</li>
              <li>Non-Disclosure Agreement (NDA)</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Row */}
        <div className="pt-8 border-t border-slate-800 text-[11px] leading-relaxed text-slate-500 space-y-4">
          <p>
            <strong>Regulatory Notice:</strong> Finnacle Accounts Solutions is an independent accounting, taxation, and financial advisory practice. Statutory representations, audits under applicable Companies Acts, and Income Tax Appellate proceedings are performed strictly by qualified chartered professionals and authorized tax practitioners in accordance with regional jurisdiction standards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/60">
            <div>
              &copy; {new Date().getFullYear()} Finnacle Accounts Solutions. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-slate-400">
              <a href="#contact" className="hover:text-white transition-colors">Client Confidentiality</a>
              <a href="#contact" className="hover:text-white transition-colors">Terms of Engagement</a>
              <a href="#contact" className="hover:text-white transition-colors">Dispute Resolution</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
