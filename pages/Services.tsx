import React from 'react';
import { Ship, ShieldCheck, PenTool, LayoutTemplate, Globe, Headphones, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    icon: Ship,
    title: "Direct Port Logistics",
    desc: "Mombasa is the gateway to East Africa. We handle everything from port clearance, KRA duties, and KEBS inspections to secure showroom delivery.",
    features: ["Customs Clearance", "Quality Inspection", "Port Delivery"]
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    desc: "Can't find it in stock? We source bespoke high-end vehicles from Japan, UK, Thailand, and South Africa per your specific requirements.",
    features: ["Auction Access", "History Verification", "Pre-Purchase Photos"]
  },
  {
    icon: PenTool,
    title: "Executive Maintenance",
    desc: "Our partner service centers in Mombasa specialize in high-spec European and Japanese diagnostics, ensuring your asset remains peak performant.",
    features: ["OBD Diagnostics", "Genuine Parts Only", "Periodic Servicing"]
  },
  {
    icon: LayoutTemplate,
    title: "Corporate Fleet Management",
    desc: "Custom fleet solutions for regional logistics partners, including leasing, tracking, and periodic maintenance schedules.",
    features: ["Bespoke Branding", "Remote Tracking", "Staff Training"]
  }
];

export default function Services() {
  return (
    <div className="pb-24">
      {/* Hero Header */}
      <header className="bg-zinc-900/50 border-b border-white/5 py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <span className="luxury-text text-primary mb-4 block">End-to-End Solutions</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
            Professional <span className="text-primary italic">Services</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mt-6 text-lg font-medium leading-relaxed italic">
            Beyond the sale, we provide the infrastructure and expertise required to maintain 
            a world-class automotive lifestyle in the Coast region.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SERVICES.map((s, i) => (
            <div key={i} className="card-luxury p-12 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -rotate-45 translate-x-12 -translate-y-12 group-hover:bg-primary/10 transition-colors" />
              <s.icon className="w-12 h-12 text-primary mb-8" />
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{s.title}</h3>
              <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-8 italic">
                {s.desc}
              </p>
              <ul className="space-y-4 mb-10">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-100">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-outline py-3 px-8 text-center block">
                Inquire Service
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-zinc-950 py-24 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-10 text-center">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6">Mombasa's Trusted Partner</h2>
          <p className="text-zinc-500 text-lg font-medium leading-relaxed italic mb-12">
            With our deep expertise in port operations and a network of certified technicians, 
            GLOBE Motors provides a shield of security around your automotive investment.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-zinc-900/50 p-8 border border-white/5">
              <p className="text-3xl font-black italic tracking-tighter text-white mb-2">100%</p>
              <p className="luxury-text">Document Authentication</p>
            </div>
            <div className="bg-zinc-900/50 p-8 border border-white/5">
              <p className="text-3xl font-black italic tracking-tighter text-white mb-2">48H</p>
              <p className="luxury-text">Port Clearance Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="max-w-7xl mx-auto px-10 py-24">
        <div className="bg-red-600 p-16 flex flex-col md:flex-row items-center justify-between group">
          <div className="max-w-xl mb-8 md:mb-0">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none mb-4">
              Need 24/7 Roadside Assistance?
            </h2>
            <p className="text-red-100 font-medium">
              Priority support for all GLOBE Motors clients across Mombasa, Kwale, and Kilifi counties.
            </p>
          </div>
          <a href="tel:+254726049670" className="bg-white text-primary px-12 py-6 font-black uppercase tracking-widest text-sm shadow-xl hover:bg-zinc-100 transition-colors">
            Emergency Hotline
          </a>
        </div>
      </section>
    </div>
  );
}
