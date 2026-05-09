import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Vehicle, Inquiry } from '../types';
import { Plus, Trash2, Edit2, LogOut, Car, MessageCircle, Mail, Phone, BarChart3, LayoutDashboard, Search, X } from 'lucide-react';
import { formatCurrency, formatNumber } from '../lib/utils';
import { VEHICLE_MAKES, VEHICLE_BODY_TYPES } from '../constants';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries'>('inventory');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    try {
      if (activeTab === 'inventory') {
        const q = query(collection(db, 'vehicles'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setVehicles(snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Vehicle[]);
      } else {
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setInquiries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Inquiry[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteVehicle = async (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle?')) {
      await deleteDoc(doc(db, 'vehicles', id));
      fetchData();
    }
  };

  const handleLogout = () => auth.signOut();

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-secondary flex flex-col">
        <div className="p-10 border-b border-white/5 flex items-center gap-3">
           <div className="w-8 h-8 bg-primary -rotate-45 flex items-center justify-center">
             <span className="rotate-45 font-black text-white italic">G</span>
           </div>
           <span className="text-xl font-black italic tracking-tighter text-white uppercase">
            Admin <span className="text-primary">Ops.</span>
          </span>
        </div>
        <nav className="flex-grow p-6 space-y-4">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.3em] font-black transition-all ${activeTab === 'inventory' ? 'bg-zinc-900 border-l-2 border-primary text-primary italic' : 'text-zinc-600 hover:text-white'}`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicles</span>
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.3em] font-black transition-all ${activeTab === 'inquiries' ? 'bg-zinc-900 border-l-2 border-primary text-primary italic' : 'text-zinc-600 hover:text-white'}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Dispatches</span>
          </button>
        </nav>
        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto p-16">
        <header className="flex justify-between items-end mb-16 px-4">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none mb-2">{activeTab}</h1>
            <p className="luxury-text text-zinc-500">Mombasa Showroom Management</p>
          </div>
          {activeTab === 'inventory' && (
            <button 
              onClick={() => { setEditingVehicle(null); setShowAddModal(true); }}
              className="btn-primary py-5"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              NEW RECORD
            </button>
          )}
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : activeTab === 'inventory' ? (
          <div className="bg-zinc-900/30 border border-white/5 relative overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-950 border-b border-white/10">
                  <th className="p-8 text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 italic">Identified Asset</th>
                  <th className="p-8 text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 italic">Offer Price</th>
                  <th className="p-8 text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 italic">Grade</th>
                  <th className="p-8 text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 italic">Status</th>
                  <th className="p-8 text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 italic text-right">Ops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-zinc-900 transition-colors group">
                    <td className="p-8">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-14 bg-zinc-950 p-1 border border-white/5">
                          <img src={v.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-widest text-white italic">{v.make} {v.model}</p>
                          <p className="text-[10px] luxury-text text-zinc-500 uppercase mt-1">{v.year} — {v.bodyType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 font-mono font-bold tracking-tighter text-zinc-300">{formatCurrency(v.price)}</td>
                    <td className="p-8">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase italic border ${v.condition === 'New' ? 'border-green-600/30 text-green-500 bg-green-600/5' : 'border-white/10 text-zinc-600'}`}>
                        {v.condition}
                      </span>
                    </td>
                    <td className="p-8">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase italic ${v.status === 'Available' ? 'text-primary underline decoration-primary underline-offset-4 decoration-2' : 'text-zinc-600'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-6">
                        <button onClick={() => { setEditingVehicle(v); setShowAddModal(true); }} className="text-zinc-700 hover:text-white transition-colors"><Edit2 className="w-5 h-5" /></button>
                        <button onClick={() => handleDeleteVehicle(v.id)} className="text-zinc-700 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 max-w-5xl">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-zinc-900/30 border border-white/5 p-10 flex justify-between items-start group relative hover:border-primary/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all" />
                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-2xl font-black italic tracking-tighter uppercase text-white leading-none">{inq.name}</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[9px] uppercase tracking-[0.2em] font-black italic">
                      {inq.type}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-lg font-medium italic mb-8 leading-relaxed max-w-3xl border-l border-white/5 pl-8 ml-2">
                    {inq.message}
                  </p>
                  <div className="flex items-center gap-10">
                    <a href={`tel:${inq.phone}`} className="flex items-center gap-3 text-[10px] luxury-text text-zinc-400 hover:text-white">
                      <Phone className="w-3.5 h-3.5 text-primary" /> 
                      <span>{inq.phone}</span>
                    </a>
                    <a href={`mailto:${inq.email}`} className="flex items-center gap-3 text-[10px] luxury-text text-zinc-400 hover:text-white uppercase transition-colors">
                      <Mail className="w-3.5 h-3.5 text-primary" /> 
                      <span>{inq.email}</span>
                    </a>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono font-bold tracking-tighter text-zinc-700 mb-4">
                    {new Date(inq.createdAt as any)?.toLocaleDateString()}
                  </p>
                  <button className="text-[10px] luxury-text text-zinc-800 hover:text-primary transition-colors uppercase italic border-b border-zinc-900 hover:border-primary pb-1">Archive Record</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal (Simplified for demo) */}
      {showAddModal && (
        <VehicleModal 
          vehicle={editingVehicle} 
          onClose={() => setShowAddModal(false)} 
          onSuccess={() => { setShowAddModal(false); fetchData(); }} 
        />
      )}
    </div>
  );
}

function VehicleModal({ vehicle, onClose, onSuccess }: { vehicle: Vehicle | null, onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Convert comma-separated strings for features/images
    const features = (formData.get('features') as string).split(',').map(s => s.trim());
    const images = (formData.get('images') as string).split(',').map(s => s.trim());

    const data = {
      make: formData.get('make'),
      model: formData.get('model'),
      year: Number(formData.get('year')),
      price: Number(formData.get('price')),
      mileage: Number(formData.get('mileage')),
      fuelType: formData.get('fuelType'),
      transmission: formData.get('transmission'),
      condition: formData.get('condition'),
      bodyType: formData.get('bodyType'),
      color: formData.get('color'),
      engineSize: formData.get('engineSize'),
      description: formData.get('description'),
      features,
      images,
      status: formData.get('status'),
      isFeatured: formData.get('isFeatured') === 'on',
      updatedAt: serverTimestamp(),
    };

    try {
      if (vehicle) {
        await updateDoc(doc(db, 'vehicles', vehicle.id), data);
      } else {
        await addDoc(collection(db, 'vehicles'), { ...data, createdAt: serverTimestamp() });
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-auto border border-zinc-800 p-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">{vehicle ? 'Edit' : 'Add'} Vehicle</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Make</label>
              <select name="make" defaultValue={vehicle?.make} required className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none">
                {VEHICLE_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Model</label>
              <input name="model" defaultValue={vehicle?.model} required type="text" className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Price (KES)</label>
                <input name="price" defaultValue={vehicle?.price} required type="number" className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Mileage (KM)</label>
                <input name="mileage" defaultValue={vehicle?.mileage} required type="number" className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Year</label>
                <input name="year" defaultValue={vehicle?.year} required type="number" className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Condition</label>
                <select name="condition" defaultValue={vehicle?.condition} className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none">
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
            </div>
             <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Images (Comma separated URLs)</label>
              <textarea name="images" defaultValue={vehicle?.images.join(', ')} required rows={3} className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none resize-none" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Fuel Type</label>
                <select name="fuelType" defaultValue={vehicle?.fuelType} className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none">
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Transmission</label>
                <select name="transmission" defaultValue={vehicle?.transmission} className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Description</label>
              <textarea name="description" defaultValue={vehicle?.description} required rows={3} className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none resize-none" />
            </div>
              <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Features (Comma separated)</label>
              <textarea name="features" defaultValue={vehicle?.features.join(', ')} required rows={3} className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Status</label>
                <select name="status" defaultValue={vehicle?.status} className="bg-zinc-950 border border-zinc-800 p-4 text-sm focus:outline-none">
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              <div className="flex items-center space-x-4 pt-6">
                 <input name="isFeatured" defaultChecked={vehicle?.isFeatured} type="checkbox" id="feat" className="w-5 h-5 accent-primary" />
                 <label htmlFor="feat" className="text-xs uppercase tracking-widest font-bold">Featured Listing</label>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full btn-primary py-5 uppercase tracking-widest font-bold mt-4"
            >
              {loading ? 'Saving Changes...' : (vehicle ? 'Update Vehicle' : 'Save Vehicle')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
