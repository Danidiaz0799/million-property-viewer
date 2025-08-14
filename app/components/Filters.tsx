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
    priceMin: undefined,
    priceMax: undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Filtrar valores vacíos antes de enviar
    const filteredData: PropertyFilters = {};
    if (localFilters.name?.trim()) filteredData.name = localFilters.name.trim();
    if (localFilters.address?.trim()) filteredData.address = localFilters.address.trim();
    if (localFilters.priceMin !== undefined && localFilters.priceMin > 0) filteredData.priceMin = localFilters.priceMin;
    if (localFilters.priceMax !== undefined && localFilters.priceMax > 0) filteredData.priceMax = localFilters.priceMax;
    
    onSearch(filteredData);
  };

  const handleInputChange = (field: keyof PropertyFilters, value: string | number) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value
    }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl mb-12 border border-white/20">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Buscar Propiedades
          </h2>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Name Input - Mejorado */}
          <div className="group">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
              🏠 Nombre de la Propiedad
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={localFilters.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ej: Apartamento lujoso..."
                className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder:text-gray-400 placeholder:font-normal hover:border-gray-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Address Input - Mejorado */}
          <div className="group">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
              📍 Ubicación
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                value={localFilters.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Ej: Bogotá, Medellín..."
                className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder:text-gray-400 placeholder:font-normal hover:border-gray-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Min Price Input - Mejorado */}
          <div className="group">
            <label htmlFor="priceMin" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
              💰 Precio Mínimo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-gray-500 font-medium">$</span>
              </div>
              <input
                type="number"
                id="priceMin"
                value={localFilters.priceMin || ''}
                onChange={(e) => handleInputChange('priceMin', e.target.value ? Number(e.target.value) : '')}
                placeholder="500,000"
                min="0"
                step="50000"
                className="w-full pl-8 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder:text-gray-400 placeholder:font-normal hover:border-gray-300"
              />
            </div>
          </div>

          {/* Max Price Input - Mejorado */}
          <div className="group">
            <label htmlFor="priceMax" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
              💎 Precio Máximo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-gray-500 font-medium">$</span>
              </div>
              <input
                type="number"
                id="priceMax"
                value={localFilters.priceMax || ''}
                onChange={(e) => handleInputChange('priceMax', e.target.value ? Number(e.target.value) : '')}
                placeholder="2,000,000"
                min="0"
                step="50000"
                className="w-full pl-8 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder:text-gray-400 placeholder:font-normal hover:border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Search Button - Mejorado */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-3"
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-lg">Buscar Propiedades</span>
          </button>
        </div>
      </form>
    </div>
  );
}
