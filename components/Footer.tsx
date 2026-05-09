import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL, INSTAGRAM_LINK, NAVIGATION_LINKS } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20">
      <div className="max-w-7xl mx-auto px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-4 group mb-6">
              <div className="geometric-logo-box">
                <span className="-rotate-45 font-black text-xl text-white">G</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase leading-none">
                  GLOBE MOTORS<span className="text-primary italic">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">Mombasa</span>
              </div>
            </Link>
            <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed font-medium text-sm">
              Mombasa's premier automotive destination for high-end luxury vehicles. 
              Certified pre-owned and new imports with a decade of regional excellence.
            </p>
            <div className="flex space-x-6">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-primary transition-colors italic uppercase tracking-widest text-[10px] font-bold underline decoration-zinc-800 underline-offset-4">Instagram</a>
              <a href="#" className="text-zinc-600 hover:text-primary transition-colors italic uppercase tracking-widest text-[10px] font-bold underline decoration-zinc-800 underline-offset-4">Messenger</a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-black italic mb-8">Navigation</h4>
            <ul className="space-y-4">
              {NAVIGATION_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-zinc-500 hover:text-primary transition-colors text-sm uppercase tracking-widest font-bold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-black italic mb-8">Contact Information</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3 h-3 text-red-500" />
                </div>
                <span className="text-zinc-500 text-sm font-medium leading-relaxed">
                  {COMPANY_ADDRESS}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3 text-red-500" />
                </div>
                <a href={`tel:${COMPANY_PHONE}`} className="text-zinc-500 hover:text-white transition-colors text-sm font-mono tracking-tighter">
                  {COMPANY_PHONE}
                </a>
              </li>
              <li className="pt-8 border-t border-white/5">
                <Link to="/admin" className="text-xs text-zinc-800 hover:text-zinc-600 transition-colors uppercase tracking-[0.2em] font-black italic">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Status Bar from Design */}
      <div className="bg-zinc-950 border-t border-white/10 px-10 py-6 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold gap-4">
        <div className="flex flex-wrap justify-center gap-8">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 
            Showroom Online
          </span>
          <span>Mombasa Port Logistics Partner</span>
          <span className="hidden sm:inline">Certified Exporter</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-zinc-700">© 2024 GLOBE MOTORS MOMBASA</span>
          <span className="text-zinc-800 font-black italic tracking-tighter">EST. 2014</span>
        </div>
      </div>
    </footer>
  );
}
