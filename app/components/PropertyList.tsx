import { Property } from '../lib/types';
import PropertyCard from './PropertyCard';
import { useEffect, useState } from 'react';
import { fetchPropertyImages } from '../services/images';

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
}

// Componente SkeletonCard para mostrar durante la carga
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="w-full bg-gray-300" style={{ aspectRatio: '16/9' }}></div>
      
      {/* Skeleton Content */}
      <div className="p-6">
        {/* Skeleton Title */}
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        
        {/* Skeleton Address */}
        <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
        
        {/* Skeleton Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-300 rounded w-32"></div>
          <div className="h-12 bg-gray-300 rounded w-28"></div>
        </div>

        {/* Skeleton Property ID */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}


export default function PropertyList({ properties, isLoading, error }: PropertyListProps) {
  const [propertyImages, setPropertyImages] = useState<Record<string, string[]>>({});

  useEffect(() => {
    async function loadImages() {
      if (!Array.isArray(properties)) return;
      const imagesMap: Record<string, string[]> = {};
      
      // Mapeo: 123345 -> IdProperty 1, 123 -> IdProperty 2
      const codeToIdMap: Record<string, number> = {
        "123345": 1,
        "123": 2
      };
      
      await Promise.all(properties.map(async (property) => {
        try {
          const propertyId = codeToIdMap[property.codeInternal];
          if (propertyId) {
            const images = await fetchPropertyImages(propertyId);
            if (images && images.length > 0) {
              imagesMap[property.codeInternal] = images.map(img => img.file);
            }
          }
        } catch (error) {
          console.error(`Error loading images for property ${property.codeInternal}:`, error);
        }
      }));
      setPropertyImages(imagesMap);
    }
    loadImages();
  }, [properties]);
  // Estado de carga
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-300 rounded w-64 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
        <div className="text-red-600 text-6xl mb-4">⚠️</div>
        <div className="text-red-700 text-xl font-semibold mb-2">
          Oops! Something went wrong
        </div>
        <div className="text-red-600 mb-4">
          {error}
        </div>
        <div className="text-sm text-red-500">
          Please try again later or contact support if the problem persists.
        </div>
      </div>
    );
  }

  // No hay propiedades
  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-12 text-center">
        <div className="text-blue-600 text-6xl mb-4">🔍</div>
        <div className="text-blue-700 text-xl font-semibold mb-2">
          No properties found.
        </div>
      </div>
    );
  }

  // Renderizar propiedades
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          {Array.isArray(properties) && properties.length === 0 ? 'No Properties Found' : `Found ${Array.isArray(properties) ? properties.length : 0} ${Array.isArray(properties) && properties.length === 1 ? 'Property' : 'Properties'}`}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.codeInternal + '-' + property.name}
            property={property}
            imageUrls={propertyImages[property.codeInternal]}
          />
        ))}
      </div>

  {/* Footer info */}
    </div>
  );
}
