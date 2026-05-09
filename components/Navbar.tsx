import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS, COMPANY_NAME, COMPANY_PHONE, WHATSAPP_LINK } from '../constants';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
      scrolled 
        ? "bg-zinc-900/90 backdrop-blur-md py-4 border-white/10" 
        : "bg-transparent py-8 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:text-white relative pb-1",
                location.pathname === link.path ? "text-white border-b-2 border-primary" : "text-zinc-500"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-6 pl-6 border-l border-white/10">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Sales Inquiry</span>
              <span className="text-sm font-mono text-primary tracking-tighter font-bold">{COMPANY_PHONE}</span>
            </div>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-100">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 shadow-xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-serif italic tracking-wider",
                    location.pathname === link.path ? "text-primary" : "text-zinc-100"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-zinc-800" />
              <div className="flex flex-col space-y-4 pt-2">
                <a href={`tel:${COMPANY_PHONE}`} className="flex items-center space-x-3 text-zinc-400">
                  <Phone className="w-4 h-4" />
                  <span>{COMPANY_PHONE}</span>
                </a>
                <a href={WHATSAPP_LINK} className="btn-primary text-center py-4">
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
