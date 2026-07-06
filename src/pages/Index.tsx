import DentalCalculator from '@/components/features/DentalCalculator';
import heroImage from '@/assets/hero-dental.jpg';

const STATS = [
  { value: '7', label: 'Decision variables scored' },
  { value: '17', label: 'Equipment categories' },
  { value: '5-yr', label: 'Cost projection horizon' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Identify Your Equipment',
    desc: 'Select category, manufacturer, model, and installation year to calibrate lifecycle benchmarks.',
  },
  {
    step: '02',
    title: 'Document Current Condition',
    desc: 'Enter repair estimate, failure frequency, downtime impact, and parts availability.',
  },
  {
    step: '03',
    title: 'Assess Financial Exposure',
    desc: 'Quantify production risk, backup status, and technology obsolescence factors.',
  },
  {
    step: '04',
    title: 'Review Your Intelligence Report',
    desc: 'Receive a scored recommendation with 5-year cost projections and industry benchmarks.',
  },
];

const FAQ = [
  {
    q: 'How is the decision score calculated?',
    a: 'The score uses a 7-component weighted model: age vs. expected lifespan (20%), repair burden ratio (25%), failure frequency (15%), downtime risk (20%), obsolescence factors (10%), and maintenance compliance (10%).',
  },
  {
    q: 'What replacement cost is used if I leave the original price blank?',
    a: 'The engine uses category-level industry averages — for example, $12,000 for dental chairs and $85,000 for CBCT units — sourced from standard dental equipment pricing benchmarks.',
  },
  {
    q: 'Is this tool appropriate for DSOs and multi-location practices?',
    a: 'Yes. The tool is designed for individual equipment assessments that can be run across multiple units. Each analysis produces a shareable, printable report.',
  },
  {
    q: 'How should I interpret the 5-year cost projection chart?',
    a: 'The chart shows cumulative costs along both paths. When the repair line crosses above the replacement line, continued repair investment becomes economically unfavorable.',
  },
];

const Index = () => {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* ── NAV ──────────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-bold text-white text-base tracking-tight">DentalAsset</span>
              <span className="font-bold text-teal-400 text-base tracking-tight">IQ</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs text-slate-400">Equipment Lifecycle Intelligence</span>
            <button
              onClick={scrollToCalculator}
              className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 min-h-[480px] flex items-center">
        {/* Blueprint grid background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              Free Operational Intelligence Tool
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Should You Repair or Replace<br />
              <span className="text-teal-400">Your Dental Equipment?</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Use operational data, lifecycle benchmarks, downtime analysis, and repair economics to make smarter, more objective equipment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={scrollToCalculator}
                className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-teal-500/25 text-base"
              >
                Start Assessment →
              </button>
              <button
                onClick={() => window.open('/sample-report.pdf', '_blank')}
                className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold py-3.5 px-8 rounded-xl transition-all text-base"
              >
                View Sample Report
              </button>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Evidence-based 7-factor algorithm', 'Takes under 3 minutes', 'No sign-up required', 'Free forever'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg className="w-3.5 h-3.5 text-teal-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
                <p className="text-2xl font-bold text-teal-400">{s.value}</p>
                <p className="text-xs text-slate-400 mt-0.5 max-w-[100px] leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How the Analysis Works</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              A structured 4-step assessment producing a scored, data-backed recommendation for each piece of equipment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl border border-slate-200 p-5 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-5xl font-black text-slate-100 leading-none select-none">
                  {item.step}
                </span>
                <div className="relative">
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">Step {item.step}</p>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ───────────────────────── */}
      <section id="calculator" className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Calculator — takes 3/5 */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Equipment Decision Assessment</h2>
                <p className="text-slate-500 text-sm">Complete all 4 steps to generate your intelligence report.</p>
              </div>
              <DentalCalculator />
            </div>

            {/* Sidebar — takes 2/5 */}
            <div className="lg:col-span-2 space-y-5">
              {/* Decision score legend */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Decision Score Guide</h3>
                <div className="space-y-2.5">
                  {[
                    { range: '0–35', label: 'Repair Recommended', color: 'bg-emerald-500', desc: 'Favorable economics, repair viable' },
                    { range: '36–55', label: 'Repair Acceptable', color: 'bg-teal-500', desc: 'Monitor closely, plan ahead' },
                    { range: '56–75', label: 'Plan Replacement', color: 'bg-amber-400', desc: 'Begin evaluating options' },
                    { range: '76–100', label: 'Replace Now', color: 'bg-red-500', desc: 'Beyond lifecycle thresholds' },
                  ].map((s) => (
                    <div key={s.range} className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${s.color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-700">{s.label}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{s.range}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Lifespans */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Industry Lifespan Benchmarks</h3>
                <div className="space-y-1.5">
                  {[
                    ['Dental Chair', '18 yrs'],
                    ['Delivery Unit', '15 yrs'],
                    ['Compressor', '12 yrs'],
                    ['Vacuum System', '10 yrs'],
                    ['CBCT / Cone Beam', '8 yrs'],
                    ['Intraoral Scanner', '6 yrs'],
                    ['Sterilizer', '10 yrs'],
                    ['CAD/CAM System', '7 yrs'],
                  ].map(([eq, life]) => (
                    <div key={eq} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                      <span className="text-xs text-slate-600">{eq}</span>
                      <span className="text-xs font-semibold text-teal-600">{life}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key stat */}
              <div className="bg-slate-900 rounded-2xl p-5 text-white">
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">Repair Burden Thresholds</p>
                <div className="space-y-2.5">
                  {[
                    { range: '< 15% of replacement cost', verdict: 'Repair strongly viable' },
                    { range: '15–35%', verdict: 'Repair acceptable' },
                    { range: '35–55%', verdict: 'Monitor carefully' },
                    { range: '> 55%', verdict: 'Replacement likely favored' },
                  ].map((row) => (
                    <div key={row.range} className="flex justify-between gap-3 text-xs border-b border-slate-700 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-400 font-mono">{row.range}</span>
                      <span className="text-slate-200 text-right">{row.verdict}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ / SEO SECTION ────────────────── */}
      <section className="py-14 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Understanding the methodology behind the DentalAssetIQ decision engine.</p>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-white border border-slate-200 rounded-xl overflow-hidden group">
                <summary className="p-5 flex items-center justify-between cursor-pointer list-none font-semibold text-slate-800 text-sm hover:text-teal-600 transition-colors">
                  {item.q}
                  <svg className="w-4 h-4 text-slate-400 shrink-0 ml-3 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-500 rounded-md flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">DentalAsset<span className="text-teal-400">IQ</span></span>
            </div>
            <p className="text-xs text-slate-500 text-center max-w-md">
              Results are estimates based on industry benchmarks and user-provided data. Not a substitute for professional financial or clinical advice. Always consult a qualified equipment specialist before major capital decisions.
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
