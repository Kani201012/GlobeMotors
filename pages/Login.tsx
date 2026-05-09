import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { seedDatabase } from '../lib/seed';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const navigate = useNavigate();

  const handleSeed = async () => {
    if (!auth.currentUser) {
      alert('Please sign in first to seed as admin');
      return;
    }
    setSeeding(true);
    const ok = await seedDatabase(auth.currentUser.email!, auth.currentUser.uid);
    if (ok) {
      alert('Database seeded and admin registered! Please reload.');
      window.location.reload();
    }
    setSeeding(false);
  };


  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user is admin
      const adminDoc = await getDoc(doc(db, 'admins', result.user.uid));
      if (adminDoc.exists()) {
        navigate('/admin');
      } else {
        setError('Unauthorized: You are not registered as an administrator.');
        await auth.signOut();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-10">
        <div className="text-center mb-10">
          <span className="font-serif text-3xl font-bold tracking-tighter text-white leading-none">
            GLOBE <span className="text-primary italic">Motors</span>
          </span>
          <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mt-4">Admin Access Port</p>
        </div>

        {error && (
          <div className="bg-primary/20 border border-primary text-primary p-4 text-xs font-bold mb-6 text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black py-4 uppercase tracking-widest text-xs font-bold flex items-center justify-center space-x-3 hover:bg-zinc-200 transition-all"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Verify with Google</span>
            </>
          )}
        </button>
        
        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed">
          Authorized personnel only. <br /> All access attempts are logged.
        </p>

        {auth.currentUser && (
          <button 
            onClick={handleSeed}
            disabled={seeding}
            className="mt-6 w-full text-[10px] text-primary uppercase font-bold tracking-tighter hover:underline"
          >
            {seeding ? 'Seeding...' : 'Dev: Seed Sample Data & Register as Admin'}
          </button>
        )}
      </div>
    </div>
  );
}
