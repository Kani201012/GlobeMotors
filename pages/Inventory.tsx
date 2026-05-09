import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Vehicle, FuelType, Transmission, Condition } from '../types';
import VehicleCard from '../components/VehicleCard';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { VEHICLE_MAKES, VEHICLE_BODY_TYPES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Inventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    make: '',
    bodyType: '',
    condition: '' as Condition | '',
    priceRange: [0, 50000000],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      setError(null);
      const path = 'vehicles';
      try {
        let q = query(collection(db, path), orderBy('createdAt', 'desc'));
        
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vehicle[];
        setVehicles(results);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Missing or insufficient permissions.");
        try {
          handleFirestoreError(err, OperationType.LIST, path);
        } catch (detailedErr: any) {
          console.error("Detailed Debug:", detailedErr.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.make.toLowerCase().includes(search.toLowerCase()) || 
                         v.model.toLowerCase().includes(search.toLowerCase());
    const matchesMake = !filters.make || v.make === filters.make;
    const matchesBody = !filters.bodyType || v.bodyType === filters.bodyType;
    const matchesCondition = !filters.condition || v.condition === filters.condition;
    const matchesPrice = v.price >= filters.priceRange[0] && v.price <= filters.priceRange[1];
    
    return matchesSearch && matchesMake && matchesBody && matchesCondition && matchesPrice;
  });

  return (
    <div className="pt-24 px-10 max-w-7xl mx-auto pb-24">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="luxury-text text-primary">Limited Discovery</span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mt-2">
            Available <span className="text-primary italic">Inventory</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="SEARCH MODELS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-900 border border-white/10 py-5 pl-14 pr-8 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-primary transition-all w-64 md:w-80"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-3 bg-zinc-900 border border-white/10 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </header>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 bg-zinc-900/40 border border-white/5 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="flex flex-col gap-3">
                <label className="luxury-text">Manufacturer</label>
                <select 
                  value={filters.make}
                  onChange={(e) => setFilters({...filters, make: e.target.value})}
                  className="bg-zinc-950 border border-white/10 p-4 text-[11px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary transition-colors appearance-none text-white"
                >
                  <option value="">All Makes</option>
                  {VEHICLE_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="luxury-text">Body Type</label>
                <select 
                  value={filters.bodyType}
                  onChange={(e) => setFilters({...filters, bodyType: e.target.value})}
                  className="bg-zinc-950 border border-white/10 p-4 text-[11px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary transition-colors appearance-none text-white"
                >
                  <option value="">All Types</option>
                  {VEHICLE_BODY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="luxury-text">Condition</label>
                <select 
                  value={filters.condition}
                  onChange={(e) => setFilters({...filters, condition: e.target.value as Condition | ''})}
                  className="bg-zinc-950 border border-white/10 p-4 text-[11px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary transition-colors appearance-none text-white"
                >
                  <option value="">All Conditions</option>
                  <option value="New">Just Landed (New)</option>
                  <option value="Used">Premium Used</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => setFilters({ make: '', bodyType: '', condition: '', priceRange: [0, 50000000] })}
                  className="w-full btn-outline py-4 text-[10px] bg-red-600/10 border-red-600/30 text-red-100 hover:bg-red-600 hover:text-white"
                >
                  Reset Parameters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-[450px] bg-zinc-900/50 animate-pulse border border-zinc-800" />
          ))}
        </div>
      ) : error ? (
        <div className="py-32 text-center bg-zinc-900/30 border border-red-900/20 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-red-900/20 flex items-center justify-center rounded-full mx-auto mb-6">
            <SlidersHorizontal className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Access Resticted</h3>
          <p className="text-zinc-500 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-zinc-900 flex items-center justify-center rounded-full mb-6">
            <Search className="w-8 h-8 text-zinc-700" />
          </div>
          <h3 className="text-2xl font-bold font-serif mb-2">No Matches Found</h3>
          <p className="text-zinc-500 max-w-md mx-auto">
            We couldn't find any vehicles matching your current selection. 
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
}
