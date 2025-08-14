'use client'

import Image from 'next/image';
import { Property } from '../lib/types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100">
      {/* Image Container */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={property.images && property.images.length > 0 ? property.images[0].file : '/default-property.jpg'}
          alt={`Property image of ${property.name} located at ${property.address}`}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority={property.idProperty === 1 || property.idProperty === 2 || property.idProperty === 3}
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
          For Sale
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {property.name}
        </h3>
        
        <p className="text-gray-700 mb-4 flex items-center text-sm font-medium">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.address}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(property.price)}
          </span>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-semibold shadow-md hover:shadow-lg">
          View Details
        </button>

        {/* Property ID */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-600 font-medium">Property ID: {property.idProperty}</span>
        </div>
      </div>
    </div>
  );
}
