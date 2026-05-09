import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gauge, Fuel, Settings2, Calendar } from 'lucide-react';
import { Vehicle } from '../types';
import { formatCurrency, formatNumber, cn } from '../lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  key?: string; // Explicitly allow key
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-luxury group h-full flex flex-col"
    >
      <Link to={`/vehicle/${vehicle.id}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={vehicle.images[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop'}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-20">
          <span className={cn(
            "px-2 py-1 text-[10px] font-black uppercase tracking-tighter",
            vehicle.condition === 'New' ? "bg-primary text-white" : "bg-zinc-700 text-zinc-100"
          )}>
            {vehicle.condition === 'New' ? 'Just Landed' : 'Premium Used'}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 mr-4">
            <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">
              {vehicle.year} • {vehicle.bodyType} • {vehicle.fuelType}
            </p>
          </div>
          <p className="mono-price text-2xl leading-none">
            {formatCurrency(vehicle.price)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/5 mt-auto">
          <div className="text-center">
            <p className="luxury-text text-[8px] mb-1">Mileage</p>
            <p className="text-xs font-black uppercase tracking-tight italic">
              {formatNumber(vehicle.mileage)} KM
            </p>
          </div>
          <div className="text-center border-x border-white/5">
            <p className="luxury-text text-[8px] mb-1">Trans</p>
            <p className="text-xs font-black uppercase tracking-tight italic">{vehicle.transmission.split(' ')[0]}</p>
          </div>
          <div className="text-center">
            <p className="luxury-text text-[8px] mb-1">Engine</p>
            <p className="text-xs font-black uppercase tracking-tight italic">{vehicle.engineSize}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
