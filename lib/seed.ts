import { collection, addDoc, serverTimestamp, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const SAMPLE_VEHICLES = [
  {
    make: 'Mercedes-Benz',
    model: 'G-Wagon G63 AMG',
    year: 2023,
    price: 32000000,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: 500,
    condition: 'New',
    color: 'Matte Black',
    engineSize: '4.0L V8',
    description: 'The pinnacle of off-road luxury. This G63 AMG comes with the night package, carbon fiber interior, and premium Burmester sound system.',
    features: ['Panoramic Roof', 'Burmester Sound', 'Heated Seats', 'Adaptive Cruise Control', '360 Camera'],
    images: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop'
    ],
    status: 'Available',
    isFeatured: true,
  },
  {
    make: 'Toyota',
    model: 'Land Cruiser 300 VXR',
    year: 2024,
    price: 24500000,
    bodyType: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: 0,
    condition: 'New',
    color: 'Arctic White',
    engineSize: '3.3L V6',
    description: 'The King of Roads. Brand new LC300 VXR with full options, beige leather interior, and advanced safety sense.',
    features: ['JBL Premium Audio', 'Rear Entertainment', 'Multi-terrain Select', 'Heads-up Display'],
    images: [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606148047425-455b706c4573?q=80&w=1200&auto=format&fit=crop'
    ],
    status: 'Available',
    isFeatured: true,
  },
  {
    make: 'BMW',
    model: 'X7 xDrive40i',
    year: 2022,
    price: 18500000,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: 12000,
    condition: 'Used',
    color: 'Mineral White',
    engineSize: '3.0L',
    description: 'Executive luxury SUV with 7 seats, sky lounge panoramic roof, and BMW laser lights. Mint condition, local unit.',
    features: ['Laser Lights', 'Sky Lounge', 'Ambient Lighting', 'Soft Close Doors'],
    images: [
      'https://images.unsplash.com/photo-1556182330-ad251458e396?q=80&w=1200&auto=format&fit=crop'
    ],
    status: 'Available',
    isFeatured: false,
  }
];

export async function seedDatabase(userEmail: string, userId: string) {
  try {
    // 1. Check if vehicles exist
    const vehicleSnap = await getDocs(collection(db, 'vehicles'));
    if (vehicleSnap.empty) {
      for (const vehicle of SAMPLE_VEHICLES) {
        await addDoc(collection(db, 'vehicles'), {
          ...vehicle,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      console.log('Seeded sample vehicles');
    }

    // 2. Set current user as admin
    await setDoc(doc(db, 'admins', userId), {
      email: userEmail,
      role: 'SuperAdmin',
      createdAt: serverTimestamp(),
    });
    console.log('Registered current user as admin');
    
    return true;
  } catch (err) {
    console.error('Seeding failed:', err);
    return false;
  }
}
