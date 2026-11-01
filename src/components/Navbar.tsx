import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (servicePreselect?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 py-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
        >
          Finnacle Accounts Solutions
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#solutions"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Solutions
          </a>
          <a
            href="#tax-tools"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Tax Calculator & Tools
          </a>
          <a
            href="#compliance"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Compliance Calendar
          </a>
          <a
            href="#case-studies"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Case Studies
          </a>
          <a
            href="#fee-estimator"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Fee Estimator
          </a>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            Schedule Consultation
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus-visible:outline-2 focus-visible:outline-slate-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
          <a
            href="#solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Solutions
          </a>
          <a
            href="#tax-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Tax Calculator & Tools
          </a>
          <a
            href="#compliance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Compliance Calendar
          </a>
          <a
            href="#case-studies"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Case Studies
          </a>
          <a
            href="#fee-estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Fee Estimator
          </a>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
