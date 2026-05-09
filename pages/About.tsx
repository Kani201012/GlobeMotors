import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from '../constants';
import { ShieldCheck, Award, Users, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-secondary">
          <img 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2000&auto=format&fit=crop" 
            alt="Dealership" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        </div>
        <div className="relative z-10 px-10 max-w-7xl mx-auto w-full">
          <span className="luxury-text text-primary mb-6 block">Legacy of Excellence</span>
          <h1 className="text-6xl md:text-9xl font-black text-white italic leading-none tracking-tighter uppercase">
            Mombasa's <br /><span className="text-primary italic">Heritage.</span>
          </h1>
          <p className="text-zinc-500 max-w-xl mt-10 text-lg font-medium leading-relaxed italic">
            GLOBE MOTORS MOMBASA represents the pinnacle of automotive retail in Kenya, 
            built on a foundation of trust and unparalleled coastal logistics expertise.
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-32 max-w-7xl mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-1">
            <span className="luxury-text text-primary mb-4 block">Our Origin</span>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-10 leading-tight">
              Revolutionizing <span className="text-primary">Ownership</span> since 2014.
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg font-medium leading-relaxed italic">
              <p>
                Founded by Erick Gareth, GLOBE MOTORS began with a single mission: to revolutionize the perception of vehicle dealerships in Mombasa. We believe that buying a high-end vehicle is more than a transaction; it's the beginning of a lifetime journey.
              </p>
              <p>
                Our curated inventory is hand-selected from the world's most prestigious auctions and suppliers. From high-performance SUVs designed for the Kenyan terrain to executive sedans for the city's leaders, every vehicle is a testament to our standards.
              </p>
            </div>
          </div>
          <div className="flex-1 relative group">
            <div className="aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/10 p-3">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop" 
                alt="Expertise" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-12 hidden md:block rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <span className="text-6xl font-black text-white italic tracking-tighter">10+</span>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white mt-2">Years Committed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-zinc-900/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-20">
            <span className="luxury-text text-primary block mb-4">Core Principles</span>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">The GLOBE Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: "Integrity", desc: "Honesty in every deal and complete transparency in history reports." },
              { icon: Award, title: "Quality", desc: "Only the finest vehicles pass our 150-point selection inspection." },
              { icon: Users, title: "Community", desc: "Proudly Mombasa-grown, serving regional leaders for over a decade." },
              { icon: Star, title: "Excellence", desc: "Bespoke after-sales support that keeps you moving with absolute confidence." }
            ].map((v, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto mb-8 rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <v.icon className="w-8 h-8 text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-white">{v.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed italic">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-32 max-w-4xl mx-auto px-10 text-center">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">
          Experience the <span className="text-primary">Difference.</span>
        </h2>
        <p className="text-zinc-500 mb-12 text-lg font-medium italic leading-relaxed">
          Whether you're looking for your first luxury car or expanding your fleet, 
          Erick and our team provide consultations that respect your time and your vision.
        </p>
        <Link to="/contact" className="btn-primary inline-block">
          Connect with a Specialist
        </Link>
      </section>
    </div>
  );
}
