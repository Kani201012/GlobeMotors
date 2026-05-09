import React, { useState } from 'react';
import { Calculator, Landmark, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Finance() {
  const [vehiclePrice, setVehiclePrice] = useState(5000000);
  const [deposit, setDeposit] = useState(1000000);
  const [term, setTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(12);

  const loanAmount = vehiclePrice - deposit;
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) / (Math.pow(1 + monthlyInterestRate, term) - 1);

  return (
    <div className="pb-24">
      {/* Hero Header */}
      <header className="bg-zinc-900/50 border-b border-white/5 py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <span className="luxury-text text-primary mb-4 block">Bespoke Solutions</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
            Automotive <span className="text-primary italic">Financing</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mt-6 text-lg font-medium leading-relaxed italic">
            Empowering your journey with flexible, transparent, and swift financial arrangements 
            tailored for East Africa's premier vehicle collection.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Loan Calculator */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-zinc-900/30 border border-white/5 p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Loan Calculator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="luxury-text">Vehicle Price (KES)</label>
                    <span className="text-white font-mono font-bold tracking-tighter">{formatCurrency(vehiclePrice)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000000" 
                    max="40000000" 
                    step="100000"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="luxury-text">Initial Deposit (KES)</label>
                    <span className="text-white font-mono font-bold tracking-tighter">{formatCurrency(deposit)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={vehiclePrice * 0.8} 
                    step="50000"
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="luxury-text block">Term (Months)</label>
                    <select 
                      value={term}
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-white/10 p-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary appearance-none text-white"
                    >
                      {[12, 24, 36, 48, 60].map(m => <option key={m} value={m}>{m} Months</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="luxury-text block">Interest Rate (%)</label>
                    <select 
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-white/10 p-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary appearance-none text-white"
                    >
                      {[8, 9, 10, 11, 12, 13, 14, 15].map(r => <option key={r} value={r}>{r}% P.A.</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/50 p-10 flex flex-col justify-center items-center text-center border border-white/5 group">
                <span className="luxury-text mb-6">Estimated Monthly Payment</span>
                <span className="text-5xl font-black tracking-tighter text-primary italic mb-2">
                  {formatCurrency(Math.round(monthlyPayment))}
                </span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Total Payable: {formatCurrency(Math.round(monthlyPayment * term))}</span>
                
                <div className="mt-10 w-full pt-10 border-t border-white/5">
                  <Link to="/contact" className="btn-primary w-full block text-center">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
            
            <p className="mt-8 text-[9px] text-zinc-600 uppercase tracking-widest leading-loose max-w-xl">
              * Disclaimer: This calculator provides an estimate only. Actual rates and payment schedules are subject to credit approval and bank terms. Fees for insurance, tracking, and processing are not included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-luxury p-10">
              <Landmark className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Partner Banks</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-6">
                We work with major financial institutions including NCBA, Stanbic, I&M, and KCB to secure the most competitive asset finance rates in Kenya.
              </p>
              <div className="flex flex-wrap gap-4 opacity-30 grayscale group-hover:grayscale-0 transition-all">
                {/* Bank placeholders logos */}
                <div className="h-6 w-20 bg-zinc-700" />
                <div className="h-6 w-20 bg-zinc-700" />
                <div className="h-6 w-20 bg-zinc-700" />
              </div>
            </div>
            <div className="card-luxury p-10">
              <ShieldCheck className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Corporate Schemes</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-6">
                Specialized lease-to-own arrangements and fleet financing solutions for established enterprises and logistics companies.
              </p>
              <Link to="/contact" className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group">
                <span>Inquire for Fleet</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Requirements Sidebar */}
        <div className="space-y-12">
          <div className="bg-zinc-900 border border-white/5 p-10">
            <h3 className="text-xs uppercase tracking-[0.3em] font-black text-white italic mb-10 pb-4 border-b border-white/10">Requirement Checklist</h3>
            
            <div className="space-y-8">
              <div>
                <p className="luxury-text text-primary mb-4">Individuals</p>
                <ul className="space-y-3">
                  {['6 Months Bank Statements', 'Copy of KRA PIN', 'ID/Passport Copy', '3 Months Pay Slips', 'Certified Employment Letter'].map(item => (
                    <li key={item} className="flex items-start gap-3 text-xs font-bold uppercase tracking-tight text-zinc-400 italic">
                      <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="luxury-text text-primary mb-4">Companies</p>
                <ul className="space-y-3">
                  {['Certificate of Incorporation', 'Memorandum & Articles', '6-12 Months Statements', 'Director ID/PIN Copies', 'CR12 Form'].map(item => (
                    <li key={item} className="flex items-start gap-3 text-xs font-bold uppercase tracking-tight text-zinc-400 italic">
                      <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-white/10">
              <div className="flex items-center gap-4 bg-zinc-950 p-6">
                <FileText className="w-10 h-10 text-primary" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">Pre-Approval</p>
                  <p className="text-zinc-500 text-[9px] uppercase tracking-widest">Get a response within 48h</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-10 border-l-2 border-primary bg-zinc-900/20 italic">
            <p className="text-zinc-400 text-sm font-medium leading-relaxed">
              "Our finance team handles the entire documentation process, from bank application to vehicle tracking installation and insurance premium financing."
            </p>
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-white">— Erick Gareth, MD</p>
          </div>
        </div>
      </div>
    </div>
  );
}
