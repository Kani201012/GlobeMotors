import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Clock } from 'lucide-react';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL, WHATSAPP_LINK } from '../constants';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        type: 'Contact',
        status: 'New',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-zinc-900/50 border-b border-white/5 py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <span className="luxury-text text-primary mb-4 block">Reach Expertise</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            Direct <span className="text-primary italic">Correspondence.</span>
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-24 py-24">
        {/* Contact Form */}
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6 underline decoration-primary decoration-4 underline-offset-8">Send a Dispatch</h2>
          <p className="text-zinc-500 mb-12 font-medium text-lg leading-relaxed italic pr-8">
            Our automotive consultants are available for personalized viewings and bespoke finance discussions. 
            Expect a response within 12 standard business hours.
          </p>

          {status === 'success' ? (
            <div className="bg-zinc-900 p-16 border border-primary relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -rotate-45 translate-x-12 -translate-y-12" />
              <div className="w-20 h-20 bg-primary/20 flex items-center justify-center rounded-full mx-auto mb-8">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-4 text-white">Transmission Successful</h3>
              <p className="text-zinc-500 font-medium italic">Thank you for contacting GLOBE MOTORS MOMBASA. We'll be in touch shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-10 px-8 py-3 btn-outline"
              >
                New Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="luxury-text">Full Governance Name</label>
                  <input required name="name" type="text" placeholder="ERIK LARSON" className="bg-zinc-900 border border-white/10 p-5 text-[11px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-800" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="luxury-text">Electronic Mail</label>
                  <input required name="email" type="email" placeholder="ERIK@DOMAIN.COM" className="bg-zinc-900 border border-white/10 p-5 text-[11px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-800" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="luxury-text">Direct Line (Phone)</label>
                <input required name="phone" type="tel" placeholder="+254 --- --- ---" className="bg-zinc-900 border border-white/10 p-5 text-[11px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-800" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="luxury-text">Detailed Inquiry</label>
                <textarea required name="message" rows={6} placeholder="HOW CAN WE ASSIST YOUR ACQUISITION?" className="bg-zinc-900 border border-white/10 p-5 text-[11px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-800 resize-none"></textarea>
              </div>
              <button 
                disabled={status === 'submitting'}
                className="btn-primary w-full py-6"
              >
                {status === 'submitting' ? 'AUTHENTICATING...' : 'EXECUTE TRANSMISSION'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-16">
          <div className="grid grid-cols-1 gap-12">
            <div>
              <h3 className="luxury-text text-primary mb-8 border-b border-white/5 pb-4">Direct Intelligence</h3>
              <div className="space-y-8">
                <a href={`tel:${COMPANY_PHONE}`} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary transition-all">
                    <Phone className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] luxury-text mb-1">Mobile Agency</p>
                    <span className="text-2xl font-mono text-zinc-300 font-black tracking-tighter group-hover:text-white transition-colors">{COMPANY_PHONE}</span>
                  </div>
                </a>
                <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary transition-all">
                    <Mail className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] luxury-text mb-1">Executive Mail</p>
                    <span className="text-lg font-mono text-zinc-300 font-black tracking-tighter group-hover:text-white transition-colors uppercase">{COMPANY_EMAIL}</span>
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="luxury-text text-primary mb-8 border-b border-white/5 pb-4">Physical Showroom</h3>
              <div className="flex items-start gap-6 mb-10">
                <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-xl font-medium text-zinc-400 italic leading-relaxed">{COMPANY_ADDRESS}</span>
              </div>
              
              <div className="aspect-[16/10] bg-zinc-900 border border-white/5 grayscale invert opacity-40 overflow-hidden group hover:opacity-100 hover:grayscale-0 hover:invert-0 transition-all duration-1000">
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
            </div>
          </div>

          <div className="p-10 border border-white/5 bg-zinc-900/30 relative">
            <div className="absolute top-0 right-0 w-12 h-1 bg-primary" />
            <h3 className="luxury-text text-primary mb-8">Operational Hours</h3>
            <div className="space-y-6">
              {[
                { day: 'Monday — Friday', time: '08:00 — 18:00' },
                { day: 'Saturday', time: '09:00 — 16:00' },
                { day: 'Sunday & Public', time: 'By Appointment' }
              ].map(h => (
                <div key={h.day} className="flex justify-between items-center text-[11px] uppercase tracking-widest font-bold">
                  <span className="text-zinc-500 italic">{h.day}</span>
                  <span className="text-zinc-200 font-mono tracking-tighter">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
