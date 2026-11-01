export interface ServiceItem {
  id: string;
  category: 'tax' | 'accounting' | 'corporate' | 'consultancy';
  title: string;
  shortDesc: string;
  deliverables: string[];
  keyBenefit: string;
  idealFor: string;
  image?: string;
}

export interface CaseStudy {
  id: string;
  clientType: string;
  sector: string;
  headline: string;
  challenge: string;
  solution: string;
  metric: string;
  metricContext: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
  year: string;
}

export interface TaxDeadline {
  id: string;
  title: string;
  category: 'Income Tax' | 'GST' | 'TDS' | 'Corporate ROC';
  dueDate: string;
  description: string;
  penaltyWarning: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annual';
}

export interface ChecklistDoc {
  id: string;
  name: string;
  category: 'individual' | 'business';
  importance: 'Mandatory' | 'Conditional' | 'Supporting';
  description: string;
}

export interface ConsultationBooking {
  id: string;
  serviceType: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: 'confirmed' | 'pending';
  createdAt: string;
}
