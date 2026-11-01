import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, Video, Building, PhoneCall, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/finnacleData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [service, setService] = useState(preselectedService || SERVICES_DATA[0].title);
  const [consultFormat, setConsultFormat] = useState<'video' | 'in_person' | 'phone'>('video');
  const [date, setDate] = useState('2026-11-04');
  const [timeSlot, setTimeSlot] = useState('10:30 AM EST');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    const randomId = 'FIN-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedBookingId(randomId);
  };

  const handleResetAndClose = () => {
    setConfirmedBookingId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Finnacle Accounts Solutions
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Schedule Financial & Tax Consultation
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {confirmedBookingId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono font-bold uppercase text-slate-400">
                  Appointment Reference: {confirmedBookingId}
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Consultation Confirmed
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  An invitation and secure intake link have been dispatched to <strong>{clientEmail}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date & Time:</span>
                  <span className="font-semibold text-slate-900">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-semibold text-slate-900 capitalize">{consultFormat.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultant:</span>
                  <span className="font-semibold text-slate-900">Senior Chartered Tax Partner</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NDA & Statutory Client Privilege Guaranteed</span>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close & Return to Overview
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Select Advisory Focus
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Tax & Accounting Inquiry">General Tax & Accounting Inquiry</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Consultation Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultFormat('video')}
                    className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      consultFormat === 'video'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Secure Video</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultFormat('in_person')}
                    className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      consultFormat === 'in_person'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Office Visit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultFormat('phone')}
                    className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      consultFormat === 'phone'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Phone Call</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="09:30 AM EST">09:30 AM EST</option>
                    <option value="11:00 AM EST">11:00 AM EST</option>
                    <option value="02:00 PM EST">02:00 PM EST</option>
                    <option value="04:30 PM EST">04:30 PM EST</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Chen"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="michael@company.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Specific Tax or Accounting Details (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Share any details on turnover, audit status, or pending notices..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
                >
                  Confirm Discovery Consultation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
