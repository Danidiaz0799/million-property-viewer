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
    <div className="group property-card bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200 fade-in-up">
      {/* Imagen */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={firstImage}
          alt={`Imagen de ${property.name}`}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badge de imágenes adicionales */}
        {imageUrls && imageUrls.length > 1 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
            📸 +{imageUrls.length - 1} fotos
          </div>
        )}

        {/* Badge de precio destacado */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
          {formatPrice(property.price)}
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Título y ubicación */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {property.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{property.address}</span>
          </div>
        </div>

        {/* Información adicional en cards pequeñas */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100">
            <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Código</div>
            <div className="text-sm font-bold text-blue-800">{property.codeInternal}</div>
          </div>
          
          {property.year && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-100">
              <div className="text-xs text-purple-600 font-semibold uppercase tracking-wide">Año</div>
              <div className="text-sm font-bold text-purple-800">{property.year}</div>
            </div>
          )}
        </div>

        {/* Información del propietario */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-200 mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Propietario ID</div>
              <div className="text-sm font-bold text-gray-800">{property.idOwner}</div>
            </div>
          </div>
        </div>

        {/* Botón de acción */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg hover:shadow-xl group-hover:shadow-2xl">
          <div className="flex items-center justify-center space-x-2">
            <span>Ver Detalles</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
