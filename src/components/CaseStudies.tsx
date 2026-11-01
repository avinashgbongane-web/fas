import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/finnacleData';

interface CaseStudiesProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenBooking }) => {
  return (
    <section id="case-studies" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Quantified Outcomes</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Client Impact</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Measurable Tax Savings and Accelerated Financial Operations
          </h2>
          <p className="text-base text-slate-600">
            Real engagements delivering audited tax recoveries, compliant restructuring, and rapid month-end closing.
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{study.clientType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.sector}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {study.headline}
                  </h3>
                </div>

                {/* Primary Quantified Metric */}
                <div className="py-3 px-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                    {study.metric}
                  </div>
                  <p className="text-xs text-slate-600">
                    {study.metricContext}
                  </p>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                  <p>
                    <strong className="text-slate-800">Challenge: </strong>
                    {study.challenge}
                  </p>
                  <p>
                    <strong className="text-slate-800">Finnacle Solution: </strong>
                    {study.solution}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenBooking(`Inquiry related to ${study.headline}`)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Similar Case Brief</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
