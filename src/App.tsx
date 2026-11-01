/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { InteractiveSuite } from './components/InteractiveSuite';
import { ComplianceCalendar } from './components/ComplianceCalendar';
import { ClientPortalDemo } from './components/ClientPortalDemo';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceTitle?: string) => {
    setSelectedServiceForBooking(serviceTitle);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceForBooking(undefined);
  };

  const handleScrollToTools = () => {
    const el = document.getElementById('tax-tools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 1. Header following strict 3-zone Top Bar Contract */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        {/* 2. Hero Section with 16:9 dominant visual asset & practice metrics */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onScrollToTools={handleScrollToTools}
        />

        {/* 3. Core Solutions Bento-Grid (Tax, Corporate GST, Accounting, Virtual CFO, Statutory Audit) */}
        <ServicesBento onSelectService={(serviceTitle) => handleOpenBooking(serviceTitle)} />

        {/* 4. Interactive Financial Suite (Old vs New Regime Calc, GST Reconciler, Fee Estimator, Document Checklist) */}
        <InteractiveSuite onOpenBooking={(serviceTitle) => handleOpenBooking(serviceTitle)} />

        {/* 5. Statutory Compliance & Filing Calendar */}
        <ComplianceCalendar />

        {/* 6. Interactive Client Workspace & Encrypted Vault Demo */}
        <ClientPortalDemo />

        {/* 7. Quantified Case Studies (Claim-to-Proof Adjacency) */}
        <CaseStudies onOpenBooking={(context) => handleOpenBooking(context)} />

        {/* 8. Attributable Client Testimonials & Accreditations */}
        <Testimonials />

        {/* 9. Direct Contact, Consultation Intake & Interactive FAQs */}
        <ContactSection onOpenBooking={() => handleOpenBooking('Priority Consultation')} />
      </main>

      {/* 10. Quiet Editorial Footer */}
      <Footer onOpenBooking={(serviceTitle) => handleOpenBooking(serviceTitle)} />

      {/* Interactive Consultation Scheduler Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedServiceForBooking}
      />
    </div>
  );
}
