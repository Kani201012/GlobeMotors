import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Vehicle, InquiryType } from '../types';
import { formatCurrency, formatNumber } from '../lib/utils';
import { motion } from 'framer-motion';
import { ChevronRight, Fuel, Gauge, Settings2, Calendar, ShieldCheck, MessageCircle, Mail, Phone, Info } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    async function fetchVehicle() {
      if (!id) return;
      const path = 'vehicles';
      const docRef = doc(db, path, id);
      try {
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setVehicle({ id: snapshot.id, ...snapshot.data() } as Vehicle);
        }
      } catch (err) {
        console.error("Error fetching vehicle:", err);
        try {
          handleFirestoreError(err, OperationType.GET, `${path}/${id}`);
        } catch (detailedErr: any) {
          console.error("Detailed Debug:", detailedErr.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchVehicle();
  }, [id]);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInquiryStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const path = 'inquiries';
    
    try {
      await addDoc(collection(db, path), {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        vehicleId: id,
        type: 'Contact',
        status: 'New',
        createdAt: serverTimestamp(),
      });
      setInquiryStatus('success');
    } catch (err) {
      console.error("Error sending inquiry:", err);
      setInquiryStatus('idle');
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (detailedErr: any) {
        console.error("Detailed Debug:", detailedErr.message);
      }
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!vehicle) {
    return (
      <div className="py-40 text-center">
        <h2 className="text-4xl font-bold mb-4">Vehicle Not Found</h2>
        <Link to="/inventory" className="text-primary hover:underline">Back to Showroom</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Year', value: vehicle.year, icon: Calendar },
    { label: 'Mileage', value: `${formatNumber(vehicle.mileage)} KM`, icon: Gauge },
    { label: 'Fuel Type', value: vehicle.fuelType, icon: Fuel },
    { label: 'Transmission', value: vehicle.transmission, icon: Settings2 },
    { label: 'Body Type', value: vehicle.bodyType, icon: Info },
    { label: 'Engine Size', value: vehicle.engineSize, icon: Settings2 },
    { label: 'Condition', value: vehicle.condition, icon: ShieldCheck },
    { label: 'Color', value: vehicle.color, icon: Info },
  ];

  return (
    <div className="pt-24 pb-32">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-10 mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-zinc-800" />
        <Link to="/inventory" className="hover:text-primary transition-colors">Showroom</Link>
        <ChevronRight className="w-3 h-3 text-zinc-800" />
        <span className="text-zinc-200">{vehicle.make} {vehicle.model}</span>
      </div>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Gallery Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary border border-white/5 p-2 group">
            <img 
              src={vehicle.images[activeImage]} 
              alt={vehicle.model} 
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute top-6 left-6 luxury-text text-white bg-secondary/80 px-4 py-2 backdrop-blur-sm">
              Authentic Media
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {vehicle.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square overflow-hidden border transition-all duration-300 ${activeImage === idx ? 'border-primary p-1' : 'border-white/5 opacity-40 hover:opacity-100'}`}
              >
                <img src={img} alt={`${vehicle.model} thumb`} className="w-full h-full object-cover grayscale" />
              </button>
            ))}
          </div>

          <div className="mt-16 space-y-20">
            <div>
              <span className="luxury-text text-primary mb-4 block underline decoration-primary decoration-2 underline-offset-4 w-fit">In-Depth Review</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 italic">About this <span className="text-primary italic">Statement Piece.</span></h2>
              <p className="text-zinc-500 font-medium leading-relaxed italic text-lg pr-12">
                {vehicle.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <span className="luxury-text text-primary mb-6 block">Premium Features</span>
                <div className="space-y-4">
                  {vehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 text-zinc-300 group">
                      <div className="w-1.5 h-1.5 bg-primary group-hover:scale-150 transition-transform" />
                      <span className="text-xs uppercase tracking-widest font-black italic">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/30 p-10 border border-white/5 relative">
                <div className="absolute top-0 right-0 w-12 h-1 bg-primary" />
                <h3 className="luxury-text text-primary mb-6">Inspecion Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] luxury-text">
                    <span className="text-zinc-500">KEBS Inspection</span>
                    <span className="text-green-500">VERIFIED</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] luxury-text">
                    <span className="text-zinc-500">Mileage Verify</span>
                    <span className="text-green-500">AUTHENTIC</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] luxury-text">
                    <span className="text-zinc-500">Service History</span>
                    <span className="text-zinc-200">AVAILABLE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Acquisition Pane */}
        <div className="lg:col-span-4 space-y-12">
          <div className="card-luxury p-10 sticky top-32">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] italic border border-primary/20">
                {vehicle.condition}
              </span>
              <span className="text-zinc-700 text-[9px] font-black tracking-widest uppercase">VIN: *******{id?.slice(-4)}</span>
            </div>
            
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">
              {vehicle.make} <br />
              <span className="text-primary italic">{vehicle.model}</span>
            </h1>
            <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-10 italic">
              {vehicle.year} Model Group — Mombasa Stock
            </p>

            <div className="text-4xl font-mono text-white font-black tracking-tighter border-y border-white/5 py-8 mb-10 flex flex-col">
              <span className="text-[10px] luxury-text text-zinc-500 mb-2">Offer Price</span>
              {formatCurrency(vehicle.price)}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-12">
              {specs.map((spec, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-2 text-zinc-600 mb-2 group-hover:text-primary transition-colors">
                    <spec.icon className="w-3.5 h-3.5" />
                    <span className="text-[9px] uppercase tracking-widest font-black italic">{spec.label}</span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-300 italic">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full btn-pill bg-green-600 text-white flex justify-center items-center gap-3 py-5 hover:bg-green-700">
                <MessageCircle className="w-5 h-5" />
                <span>WHATSAPP INQUIRY</span>
              </a>
              <Link to="/finance" className="w-full btn-outline block text-center py-5">
                FINANCE CALCULATOR
              </Link>
            </div>
          </div>

          <div className="bg-secondary p-10 border border-white/5 relative group">
            <div className="absolute top-0 right-0 w-2 h-full bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8 text-white">Direct Dispatch</h3>
            
            {inquiryStatus === 'success' ? (
              <div className="text-center py-10 bg-zinc-900 border border-primary p-6">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-6" />
                <p className="text-sm font-black italic uppercase tracking-widest text-white mb-2 underline decoration-primary decoration-2">Protocol Active</p>
                <p className="text-[10px] luxury-text text-zinc-500 uppercase tracking-widest">A specialist will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] luxury-text text-zinc-500">Intelligence Profile (Name)</label>
                  <input required name="name" type="text" className="w-full bg-zinc-950 border border-white/10 p-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] luxury-text text-zinc-500">Comm-Channel (Email)</label>
                  <input required name="email" type="email" className="w-full bg-zinc-950 border border-white/10 p-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] luxury-text text-zinc-500">Acquisition Terms</label>
                  <textarea required name="message" rows={4} placeholder="SPECIFY REQUIREMENTS..." className="w-full bg-zinc-950 border border-white/10 p-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary text-white resize-none"></textarea>
                </div>
                <button 
                  disabled={inquiryStatus === 'submitting'}
                  className="btn-primary w-full py-6 group"
                >
                  <span className="group-hover:tracking-[0.4em] transition-all">{inquiryStatus === 'submitting' ? 'AUTHENTICATING...' : 'EXECUTE INQUIRY'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
