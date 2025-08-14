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
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse border border-gray-100">
      {/* Skeleton Image */}
      <div className="w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" 
           style={{ aspectRatio: '16/9' }}>
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Skeleton Content */}
      <div className="p-6">
        {/* Skeleton Title */}
        <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl mb-4 w-4/5"></div>
        
        {/* Skeleton Address */}
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl mb-6 w-3/4"></div>
        
        {/* Skeleton Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-xl">
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-12"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16"></div>
          </div>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-xl">
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-8"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12"></div>
          </div>
        </div>

        {/* Skeleton Owner Info */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-xl mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-20"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Button */}
        <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl"></div>
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
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-200 rounded-2xl w-80 animate-pulse"></div>
          <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded-xl w-40 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-blue-700 font-medium">Cargando propiedades increíbles...</span>
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-red-800 mb-4">
            ¡Ups! Algo salió mal
          </h3>
          <p className="text-red-600 mb-6 text-lg">
            {error}
          </p>
          <p className="text-red-500 text-sm mb-8">
            Por favor, intenta nuevamente más tarde o contacta a nuestro equipo de soporte.
          </p>
          <button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // No hay propiedades
  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-blue-800 mb-4">
            No encontramos propiedades
          </h3>
          <p className="text-blue-600 mb-6 text-lg">
            Intenta ajustar tus filtros de búsqueda para encontrar más opciones.
          </p>
          <div className="space-y-3 text-blue-500 text-sm">
            <p>💡 <strong>Sugerencias:</strong></p>
            <p>• Aumenta el rango de precios</p>
            <p>• Busca en otras ubicaciones</p>
            <p>• Reduce los filtros específicos</p>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar propiedades
  return (
    <div className="space-y-10">
      {/* Header con contador y estadísticas */}
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              {Array.isArray(properties) && properties.length === 0 
                ? 'No se encontraron propiedades' 
                : `${Array.isArray(properties) ? properties.length : 0} ${Array.isArray(properties) && properties.length === 1 ? 'Propiedad Encontrada' : 'Propiedades Encontradas'}`
              }
            </h2>
            <p className="text-gray-600 text-lg">
              Resultados de tu búsqueda personalizada
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-xl border border-green-200">
              <span className="text-green-700 font-semibold text-sm">✓ Verificadas</span>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-xl border border-blue-200">
              <span className="text-blue-700 font-semibold text-sm">📸 Con Fotos</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid de propiedades mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {properties.map((property, index) => (
          <div key={property.codeInternal + '-' + property.name} 
               className="transform transition-all duration-300 hover:scale-[1.02]"
               style={{ animationDelay: `${index * 100}ms` }}>
            <PropertyCard
              property={property}
              imageUrls={propertyImages[property.codeInternal]}
            />
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-3xl p-8 text-center border border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🏆 ¿Necesitas más opciones?
          </h3>
          <p className="text-gray-600 mb-6">
            Nuestro equipo de expertos puede ayudarte a encontrar propiedades exclusivas que no están listadas públicamente.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Contactar Asesor Especializado
          </button>
        </div>
      </div>
    </div>
  );
}
