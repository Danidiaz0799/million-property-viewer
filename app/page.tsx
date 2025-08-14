'use client'

import Filters from './components/Filters';
import PropertyList from './components/PropertyList';
import { useProperties } from './hooks/useProperties';

export default function Home() {
  const { properties, totalCount, isLoading, error, filters, handleSearch, handlePageChange } = useProperties();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        
        <Filters onSearch={handleSearch} />
        <PropertyList 
          properties={properties} 
          isLoading={isLoading} 
          error={error} 
        />
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
