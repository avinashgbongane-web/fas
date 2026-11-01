import React from 'react';
import { ArrowRight, ShieldCheck, Calculator, FileCheck2 } from 'lucide-react';
import { PRACTICE_METRICS } from '../data/finnacleData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToTools: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToTools }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 pb-16 lg:pt-14 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Proposition & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Chartered Practice</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Income Tax & GST</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Virtual CFO</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Precision Accounting, Tax Optimization, and Strategic Financial Advisory.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Finnacle Accounts Solutions delivers institutional-grade income tax planning, corporate taxation, multi-entity cloud bookkeeping, and high-stakes advisory. We safeguard compliance, eliminate tax leakage, and give business founders absolute fiscal clarity.
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer shadow-sm group"
              >
                <span>Schedule Discovery Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onScrollToTools}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-slate-500" />
                <span>Calculate Tax & Fees</span>
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero-Notice Audit Defense Track Record</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-amber-600" />
                <span>Old vs New Regime Comparative Tax Analysis</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm aspect-4/3 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_finnacle_advisory_1793514942713.jpg"
                alt="Finnacle Accounts Solutions executive advisory boardroom overlooking modern financial center"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  Corporate Advisory Practice
                </p>
                <p className="text-sm font-medium leading-snug text-slate-100">
                  Institutional tax preparation and financial restructuring for high-growth enterprises and HNIs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Metrics Strip (Full-width row below hero split) */}
        <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {PRACTICE_METRICS.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
                {metric.label}
              </div>
              <p className="text-xs text-slate-500 leading-normal">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
