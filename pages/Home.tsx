import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Star, ShieldCheck, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Vehicle } from '../types';
import VehicleCard from '../components/VehicleCard';
import { WHATSAPP_LINK } from '../constants';

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const path = 'vehicles';
      try {
        const q = query(
          collection(db, path),
          where('isFeatured', '==', true),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const vehicles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vehicle[];
        setFeaturedVehicles(vehicles);
      } catch (err) {
        console.error("Error fetching featured vehicles:", err);
        try {
          handleFirestoreError(err, OperationType.LIST, path);
        } catch (detailedErr: any) {
          console.error("Detailed Debug:", detailedErr.message);
        }
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Car" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="luxury-text text-primary mb-6 block underline decoration-primary decoration-2 underline-offset-8 w-fit">Established Excellence</span>
            <h1 className="text-6xl md:text-[8rem] font-black mb-10 leading-none tracking-tighter uppercase italic">
              Legacy in <br />
              <span className="text-primary italic">Motion.</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-medium italic max-w-xl mb-14 leading-relaxed pr-8">
              Mombasa's most exclusive collection of high-spec vehicles. 
              Built on a foundation of trust and coastal logistics expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/inventory" className="btn-primary py-6 px-12 group flex items-center justify-center gap-4">
                <span>DISCOVER INVENTORY</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-outline py-6 px-12">
                BESPOKE SOURCING
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-12 hidden md:flex flex-col items-center">
          <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
          <span className="luxury-text mt-4 rotate-90">Scroll Down</span>
        </div>
      </section>

      {/* Stats / Value Prop */}
      <section className="py-24 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Certified Priority", desc: "Every vehicle undergoes a rigorous 150-point inspection by our master technicians." },
              { icon: Star, title: "Premium Experience", desc: "Tailored automotive consulting to ensure your purchase matches your lifestyle." },
              { icon: MapPin, title: "Local Heritage", desc: "Serving Mombasa for over a decade with trust, transparency, and excellence." }
            ].map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-4"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-zinc-800">
                  <prop.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif">{prop.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Inventory Section with Sidebar */}
      <section className="py-24 bg-zinc-900/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Info */}
            <div className="lg:w-80 flex flex-col justify-between border-r border-white/5 pr-10">
              <div>
                <div className="mb-12">
                  <h2 className="luxury-text text-primary mb-4">Premium Selection</h2>
                  <p className="text-3xl font-light leading-tight italic font-serif">
                    Mombasa's finest collection of performance vehicles.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div className="group cursor-pointer">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Available Stock</p>
                    <p className="text-xl font-bold">42 <span className="text-xs font-normal text-zinc-400">Vehicles</span></p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">New Arrivals</p>
                    <p className="text-xl font-bold">12 <span className="text-xs font-normal text-zinc-400">This week</span></p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Showroom Hours</p>
                    <p className="text-sm">08:00 AM — 06:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 mt-12 lg:mt-0">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest leading-loose">
                  2540 Mombasa Road<br/>Mombasa, Kenya, 80100<br/>Managed by Erick Gareth
                </p>
              </div>
            </div>

            {/* Main Inventory Grid */}
            <div className="flex-1">
              <div className="flex items-end justify-between mb-12">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                  Showroom <span className="text-primary italic">Featured</span>
                </h1>
                <Link to="/inventory" className="btn-outline py-2 px-6">
                  Browse All
                </Link>
              </div>

              {featuredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                  
                  {/* Horizontal Promo Card inside the grid structure */}
                  <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-red-600 to-red-900 p-10 flex flex-col md:flex-row items-center justify-between group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10 max-w-md mb-6 md:mb-0">
                      <h4 className="text-3xl font-black uppercase italic leading-tight text-white mb-2">
                        Upgrade Your Journey with Flexible Financing
                      </h4>
                      <p className="text-sm text-red-100 opacity-80">
                        Bespoke payment plans for residents and companies across the Coast region.
                      </p>
                    </div>
                    <Link to="/contact" className="relative z-10 px-10 py-5 bg-white text-primary font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-zinc-100 transition-colors">
                      Get Pre-Approved
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center border border-dashed border-zinc-800">
                  <p className="text-zinc-500">Curating the finest collection for you...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slogan / CTA Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-primary">
          <div className="absolute inset-0 bg-zinc-950/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            The Drive of Your <span className="italic">Dreams</span> Awaits.
          </h2>
          <p className="text-white/80 text-xl font-light mb-12 max-w-2xl mx-auto">
            Contact Erick Gareth today and step into the world of premium automotive excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-white text-black font-bold uppercase tracking-widest px-10 py-5 transition-transform hover:scale-105">
              WhatsApp Us Now
            </a>
            <Link to="/contact" className="border border-white text-white font-bold uppercase tracking-widest px-10 py-5 hover:bg-white hover:text-black transition-all">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Location Map Placeholder */}
      <section className="py-0 relative h-[500px] border-t border-zinc-900">
        <div className="absolute inset-0 grayscale invert opacity-50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.167814407513!2d39.664424!3d-4.043477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012971676949f%3A0xedcbd0075f14bc33!2sMombasa%2C%20Kenya!5e0!3m2!1sen!2sus!4v1715230000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      </section>
    </div>
  );
}
