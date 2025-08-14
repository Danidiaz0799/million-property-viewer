'use client'

import Filters from './components/Filters';
import PropertyList from './components/PropertyList';
import { useProperties } from './hooks/useProperties';

export default function Home() {
  const { properties, totalCount, isLoading, error, filters, handleSearch, handlePageChange } = useProperties();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🏘️ Million Property Viewer
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Discover your dream property from our extensive collection of premium real estate. 
            Browse luxury apartments, family homes, and unique properties across major cities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                <p className="text-gray-700 font-medium">Available Properties</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {Array.isArray(properties) && properties.length > 0 ? `$${Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 1000)}K` : '$0'}
                </p>
                <p className="text-gray-700 font-medium">Average Price</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-gray-700 font-medium">Cities Available</p>
              </div>
            </div>
          </div>
        </div>
        
        <Filters onSearch={handleSearch} />
        
        <PropertyList 
          properties={properties} 
          isLoading={isLoading} 
          error={error} 
        />

        {/* Paginación simple */}
        {totalCount > (filters.pageSize || 10) && (
          <div className="flex justify-center mt-8">
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => handlePageChange((filters.page || 1) - 1)}
              disabled={(filters.page || 1) <= 1}
            >
              Anterior
            </button>
            <span className="px-4 py-2 font-semibold">Página {filters.page || 1}</span>
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => handlePageChange((filters.page || 1) + 1)}
              disabled={((filters.page || 1) * (filters.pageSize || 10)) >= totalCount}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
