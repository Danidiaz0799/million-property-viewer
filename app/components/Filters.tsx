'use client'

import { useState } from 'react';
import { PropertyFilters } from '../services/api';

interface FiltersProps {
  onSearch: (filters: PropertyFilters) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState<PropertyFilters>({
    name: '',
    address: '',
    minPrice: undefined,
    maxPrice: undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Filtrar valores vacíos antes de enviar
    const filteredData: PropertyFilters = {};
    if (localFilters.name?.trim()) filteredData.name = localFilters.name.trim();
    if (localFilters.address?.trim()) filteredData.address = localFilters.address.trim();
    if (localFilters.minPrice !== undefined && localFilters.minPrice > 0) filteredData.minPrice = localFilters.minPrice;
    if (localFilters.maxPrice !== undefined && localFilters.maxPrice > 0) filteredData.maxPrice = localFilters.maxPrice;
    
    onSearch(filteredData);
  };

  const handleInputChange = (field: keyof PropertyFilters, value: string | number) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value
    }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search Properties
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2">
              Property Name
            </label>
            <input
              type="text"
              id="name"
              value={localFilters.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Search by property name..."
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-500 placeholder:font-medium"
            />
          </div>

          {/* Address Input */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="address"
              value={localFilters.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter city or location..."
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-500 placeholder:font-medium"
            />
          </div>

          {/* Min Price Input */}
          <div className="flex flex-col">
            <label htmlFor="minPrice" className="text-sm font-semibold text-gray-700 mb-2">
              Min Price ($)
            </label>
            <input
              type="number"
              id="minPrice"
              value={localFilters.minPrice || ''}
              onChange={(e) => handleInputChange('minPrice', e.target.value ? Number(e.target.value) : '')}
              placeholder="Min price (e.g., 500000)"
              min="0"
              step="10000"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-500 placeholder:font-medium"
            />
          </div>

          {/* Max Price Input */}
          <div className="flex flex-col">
            <label htmlFor="maxPrice" className="text-sm font-semibold text-gray-700 mb-2">
              Max Price ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handleInputChange('maxPrice', e.target.value ? Number(e.target.value) : '')}
              placeholder="Max price (e.g., 1200000)"
              min="0"
              step="10000"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-500 placeholder:font-medium"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Properties
          </button>
        </div>
      </form>
    </div>
  );
}
