import { Link } from 'react-router-dom';
import { ShieldAlert, ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950 px-10">
      <div className="max-w-2xl w-full text-center py-24 border border-white/5 bg-zinc-900/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -rotate-45 translate-x-12 -translate-y-12" />
        <div className="w-20 h-20 bg-primary/20 flex items-center justify-center rounded-full mx-auto mb-10">
          <ShieldAlert className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white mb-4 leading-none">
          Out of <span className="text-zinc-700 italic">Bounds.</span>
        </h1>
        <p className="luxury-text text-zinc-500 mb-12">Error Code: 404 — Record Not Found</p>
        <p className="text-zinc-500 font-medium italic mb-12 max-w-md mx-auto leading-relaxed">
          The quadrant you are attempting to access does not exist in our current showroom inventory.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-3 py-5 px-12">
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Showroom</span>
        </Link>
      </div>
    </div>
  );
}
