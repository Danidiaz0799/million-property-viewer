'use client'

import { useState } from 'react';
import { PropertyFilters } from '../services/api';
import { inputStyles, buttonStyles, containerStyles, headerStyles, iconStyles } from '@/app/lib/styles';

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
    <div className={containerStyles.card}>
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className={iconStyles.large} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className={headerStyles.sectionTitle}>
            Buscar Propiedades
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2">
              🏠 Nombre de la Propiedad
            </label>
            <input
              type="text"
              id="name"
              value={localFilters.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ej: Apartamento lujoso..."
              className={inputStyles.base}
            />
          </div>

          {/* Address Input */}
          <div>
            <label htmlFor="address" className="block text-sm font-bold text-gray-800 mb-2">
              📍 Ubicación
            </label>
            <input
              type="text"
              id="address"
              value={localFilters.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Ej: Bogotá, Medellín..."
              className={inputStyles.base}
            />
          </div>

          {/* Min Price Input */}
          <div>
            <label htmlFor="priceMin" className="block text-sm font-bold text-gray-800 mb-2">
              💰 Precio Mínimo
            </label>
            <input
              type="number"
              id="priceMin"
              value={localFilters.priceMin || ''}
              onChange={(e) => handleInputChange('priceMin', e.target.value ? Number(e.target.value) : '')}
              placeholder="500,000"
              min="0"
              step="50000"
              className={inputStyles.base}
            />
          </div>

          {/* Max Price Input */}
          <div>
            <label htmlFor="priceMax" className="block text-sm font-bold text-gray-800 mb-2">
              💎 Precio Máximo
            </label>
            <input
              type="number"
              id="priceMax"
              value={localFilters.priceMax || ''}
              onChange={(e) => handleInputChange('priceMax', e.target.value ? Number(e.target.value) : '')}
              placeholder="2,000,000"
              min="0"
              step="50000"
              className={inputStyles.base}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className={buttonStyles.primary}
          >
            <div className="flex items-center space-x-3">
              <svg className={iconStyles.large} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Buscar Propiedades</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}