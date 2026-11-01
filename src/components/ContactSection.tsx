import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/finnacleData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Income Tax Planning & Filing',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    // simple email validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form & Direct Contact Details (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Direct Advisory Inquiries</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Response in &lt; 2 Hours</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Discuss Your Tax, Accounting, or Advisory Scope
              </h2>
              <p className="text-sm text-slate-600">
                Connect with our senior partners for a confidential financial review of your corporate books or personal tax structure.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-white border border-emerald-300 shadow-xs space-y-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">
                  Advisory Inquiry Successfully Logged
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A Senior Chartered Tax Consultant from Finnacle Accounts Solutions has been assigned to your file and will contact you at <strong>{formData.email}</strong> within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      service: 'Income Tax Planning & Filing',
                      message: ''
                    });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4"
              >
                {errorMsg && (
                  <div className="p-3 text-xs text-rose-700 bg-rose-50 rounded-lg border border-rose-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Corporate / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rachel@sterlingcorp.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Company / Entity Name
                    </label>
                    <input
                      type="text"
                      placeholder="Sterling Enterprises LLC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Primary Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Income Tax Planning & Filing">Income Tax Planning & Filing</option>
                    <option value="Corporate Taxation & GST Compliance">Corporate Taxation & GST Compliance</option>
                    <option value="Full-Scale Bookkeeping & Cloud Accounting">Full-Scale Bookkeeping & Cloud Accounting</option>
                    <option value="Strategic Financial Consultancy & Virtual CFO">Strategic Financial Consultancy & Virtual CFO</option>
                    <option value="Statutory Audits & Regulatory Compliance">Statutory Audits & Regulatory Compliance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Brief Note or Filing Requirement
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details regarding your entity size, upcoming deadlines, or current accounting bottlenecks..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
                >
                  Submit Confidential Advisory Request
                </button>
              </form>
            )}

            {/* Direct Office Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Advisory Hotline</span>
                </div>
                <div className="text-slate-600 font-mono">+1 (800) 346-6225</div>
                <div className="text-[11px] text-slate-400">Direct CA Desk: 9am - 7pm EST</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Mail className="w-4 h-4 text-slate-600" />
                  <span>Statutory Inquiries</span>
                </div>
                <div className="text-slate-600 font-mono">advisory@finnacleaccounts.com</div>
                <div className="text-[11px] text-slate-400">Encrypted portal submission</div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Frequently Answered Inquiries</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Clarity First</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Common Questions on Taxation, Bookkeeping & Engagements
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                    >
                      <span className="text-xs font-bold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Consultation Banner */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Need Immediate Tax or Scrutiny Support?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If your business faces an urgent statutory deadline or received a departmental notice, book a direct priority session with our Senior Chartered Partner today.
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="py-2.5 px-4 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Book Priority Discovery Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
