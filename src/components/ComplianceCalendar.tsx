import React, { useState } from 'react';
import { Calendar, AlertTriangle, Bell, Check, Clock } from 'lucide-react';
import { TAX_DEADLINES } from '../data/finnacleData';

export const ComplianceCalendar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Income Tax', 'GST', 'TDS', 'Corporate ROC'];

  const filteredDeadlines = TAX_DEADLINES.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="compliance" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Statutory Timeline</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Penal Protection</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Statutory Compliance & Tax Filing Calendar
            </h2>
            <p className="text-base text-slate-600">
              Never miss an advance tax installment or GST return. Our practice guarantees 100% on-time filings with zero statutory penal interest.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl overflow-x-auto max-w-full shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Deadlines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeadlines.map((deadline) => {
            const hasReminder = !!reminders[deadline.id];
            return (
              <div
                key={deadline.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-2xs space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                      {deadline.category}
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {deadline.dueDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {deadline.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {deadline.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50/80 p-2.5 rounded-lg">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="leading-tight">{deadline.penaltyWarning}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleReminder(deadline.id)}
                    className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      hasReminder
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {hasReminder ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Filing Alert Active</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-slate-500" />
                        <span>Add Filing Reminder</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
