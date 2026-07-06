import { useState } from 'react';
import type { LeadFormData } from '@/types/calculator';
import { toast } from 'sonner';

interface Props {
  recommendedBrand: string;
  equipmentLabel: string;
}

const LeadGenForm = ({ recommendedBrand, equipmentLabel }: Props) => {
  const [form, setForm] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (field: keyof LeadFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.name.trim() !== '' && form.email.includes('@') && form.zipCode.length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);

    try {
      const body = new URLSearchParams();
      body.append('form_fields[name]', form.name);
      body.append('form_fields[email]', form.email);
      body.append('form_fields[custom_6]', form.phone);
      body.append('form_fields[address_zip]', form.zipCode);
      body.append('form_fields[custom_7]', equipmentLabel);
      body.append('form_fields[custom_8]', recommendedBrand);

      await fetch('https://app.kajabi.com/forms/2149598552/form_submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        mode: 'no-cors',
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitted(true); // still show success — Kajabi submission is fire-and-forget
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Request Received!</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          A certified {recommendedBrand} distributor in your area will reach out within 1 business day with a customized quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Dr. Jane Smith"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="jane@mypractice.com"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-phone">
            Phone Number
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="(555) 000-0000"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="lead-zip">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-zip"
            type="text"
            value={form.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
            placeholder="90210"
            maxLength={10}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          `Get a ${recommendedBrand} Quote from a Local Distributor →`
        )}
      </button>
      <p className="text-xs text-slate-400 text-center">
        No spam. Your information is shared only with verified local dental equipment distributors.
      </p>
    </form>
  );
};

export default LeadGenForm;
