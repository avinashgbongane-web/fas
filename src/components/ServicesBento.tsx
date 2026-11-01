import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldAlert, ReceiptText, BookOpenCheck, PieChart } from 'lucide-react';
import { SERVICES_DATA } from '../data/finnacleData';
import { ServiceItem } from '../types';

interface ServicesBentoProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES_DATA[0]);

  return (
    <section id="solutions" className="py-18 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Core Solutions</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Comprehensive Statutory & Advisory Coverage</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            End-to-End Accounting, Taxation, and Financial Advisory Services
          </h2>
          <p className="text-base text-slate-600">
            Tailored solutions designed to safeguard compliance, eliminate tax penalties, optimize cash reserves, and empower corporate board decisions.
          </p>
        </div>

        {/* Asymmetric Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Service Selector Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {SERVICES_DATA.map((service, index) => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-md ring-1 ring-slate-900/10'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="font-mono text-slate-400">0{index + 1}.</span>
                        <span className="capitalize">{service.category} Practice</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-slate-600 font-normal">{service.idealFor}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service.title);
                      }}
                      className={`shrink-0 p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isSelected
                          ? 'bg-slate-900 text-white hover:bg-slate-800'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      title="Book this service consultation"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                        <TrendingUp className="w-4 h-4 shrink-0" />
                        <span>Key Impact: {service.keyBenefit}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Inspector Panel for Selected Service (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-7 space-y-6">
            {/* Visual Header */}
            {selectedService.image ? (
              <div className="relative rounded-xl overflow-hidden aspect-16/10 border border-slate-200 bg-slate-100">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {selectedService.title}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  <PieChart className="w-4 h-4" />
                  <span>Strategic Executive Suite</span>
                </div>
                <h4 className="text-base font-bold">{selectedService.title}</h4>
                <p className="text-xs text-slate-300">
                  Direct engagement with senior chartered accountants and experienced finance directors.
                </p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Included Deliverables & Scope
              </h4>
              <ul className="space-y-2.5">
                {selectedService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="text-xs font-semibold text-slate-800">
                Ideal Client Profile:
              </div>
              <p className="text-xs text-slate-600 leading-normal">
                {selectedService.idealFor}
              </p>
              <div className="text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                <span className="font-semibold text-slate-700">Audit Proof Guarantee:</span> Every filing is cross-verified by dual review before submission to the statutory portal.
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onSelectService(selectedService.title)}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Request {selectedService.title} Advisory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
