'use client';
import { Monitor, Truck, Package, Wrench, Frown, ClipboardList, MapPin } from 'lucide-react';

export default function CategoryIcon({ category, size = 20, className = '' }) {
  switch (category) {
    case 'POS Issue':
      return <Monitor size={size} className={className} />;
    case 'Delivery Delay':
      return <Truck size={size} className={className} />;
    case 'Inventory':
      return <Package size={size} className={className} />;
    case 'Kitchen Equipment':
      return <Wrench size={size} className={className} />;
    case 'Customer Complaint':
      return <Frown size={size} className={className} />;
    default:
      return <ClipboardList size={size} className={className} />;
  }
}
