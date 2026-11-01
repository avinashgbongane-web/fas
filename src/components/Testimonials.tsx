import React from 'react';
import { Award, CheckCheck, Landmark, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/finnacleData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Client Endorsements</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Verified Track Record</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Trusted by Managing Directors, Founders, and Chief Financial Officers
          </h2>
          <p className="text-base text-slate-600">
            Read direct feedback from corporate leaders who rely on Finnacle Accounts Solutions for their monthly accounting and annual statutory tax defense.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>

                <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-xs text-emerald-900 font-medium">
                  <span className="font-semibold block text-emerald-950">Verified Business Outcome:</span>
                  {t.outcome}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <div className="text-sm font-bold text-slate-900">{t.author}</div>
                <div className="text-xs text-slate-600">{t.role}, {t.company}</div>
                <div className="text-[11px] text-slate-400 mt-1">{t.year}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Accreditations & Compliance Standards */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Institutional Standards & Statutory Accreditations
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white">
              <Landmark className="w-5 h-5 text-slate-800 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">Chartered Practice</div>
                <div className="text-slate-500">Statutory Audit Authorized</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">Tax Bar Association</div>
                <div className="text-slate-500">Appellate Representation</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white">
              <CheckCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">QuickBooks & Xero</div>
                <div className="text-slate-500">Certified Elite ProAdvisor</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white">
              <Award className="w-5 h-5 text-amber-700 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">SOC 2 / ISO 27001</div>
                <div className="text-slate-500">Encrypted Client Data Vault</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
