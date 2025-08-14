'use client'

import { Property } from '../lib/types';
import Image from 'next/image';

interface PropertyCardProps {
  property: Property;
  imageUrls?: string[];
}

export default function PropertyCard({ property, imageUrls }: PropertyCardProps) {
  const firstImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://via.placeholder.com/400x300?text=No+Image';
  const formatPrice = (price?: number) => {
    if (typeof price !== 'number') return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100">
      {/* Imagen */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={firstImage}
          alt={`Imagen de ${property.name}`}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {imageUrls && imageUrls.length > 1 && (
          <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            +{imageUrls.length - 1} más
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {property.name}
        </h3>
        <p className="text-gray-700 mb-4 flex items-center text-sm font-medium">
          {property.address}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(property.price)}
          </span>
        </div>
        <div className="text-xs text-gray-600 font-medium mb-2">
          Código interno: {property.codeInternal}
        </div>
        {property.year && (
          <div className="text-xs text-gray-600 font-medium mb-2">
            Año: {property.year}
          </div>
        )}
        <div className="text-xs text-gray-600 font-medium mb-2">
          ID Propietario: {property.idOwner}
        </div>
      </div>
    </div>
  );
}
