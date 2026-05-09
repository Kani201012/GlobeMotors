export type VehicleStatus = 'Available' | 'Sold' | 'Reserved';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Transmission = 'Automatic' | 'Manual';
export type Condition = 'New' | 'Used';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  bodyType: string;
  fuelType: FuelType;
  transmission: Transmission;
  mileage: number;
  condition: Condition;
  color: string;
  engineSize: string;
  description: string;
  features: string[];
  images: string[];
  status: VehicleStatus;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InquiryType = 'Contact' | 'Test Drive' | 'Price Negotiation' | 'Finance';
export type InquiryStatus = 'New' | 'Read' | 'Replied' | 'Closed';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicleId?: string;
  type: InquiryType;
  status: InquiryStatus;
  createdAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'SuperAdmin' | 'Sales';
}
