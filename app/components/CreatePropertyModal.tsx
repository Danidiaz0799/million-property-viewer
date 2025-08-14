'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertyCreated: () => void;
  owners: Array<{ id: number; name: string; address: string; photo?: string }>;
}

interface PropertyFormData {
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  idOwner: number;
  imageUrl?: string;
}

export default function CreatePropertyModal({ isOpen, onClose, onPropertyCreated, owners = [] }: CreatePropertyModalProps) {
  // Validar que owners sea un array válido
  const validOwners = Array.isArray(owners) ? owners.filter(owner => 
    owner && 
    typeof owner.id === 'number' &&
    typeof owner.name === 'string' && 
    owner.name.trim() !== ''
  ) : [];

  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    address: '',
    price: 0,
    codeInternal: '',
    year: new Date().getFullYear(),
    idOwner: 0,
    imageUrl: '',
  });
  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleClose = () => {
    setFormData({
      name: '',
      address: '',
      price: 0,
      codeInternal: '',
      year: new Date().getFullYear(),
      idOwner: 0,
      imageUrl: '',
    });
    setImagePreview('');
    setError('');
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'year' || name === 'idOwner'
        ? (value === '' ? 0 : Number(value))
        : value
    }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, imageUrl: url }));
    
    // Solo establecer preview si es una URL válida
    if (url && isValidUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview('');
    }
  };

  // Función auxiliar para validar URLs
  const isValidUrl = (string: string): boolean => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Crear la propiedad
      const propertyResponse = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          price: formData.price,
          codeInternal: formData.codeInternal,
          year: formData.year,
          idOwner: formData.idOwner,
        }),
      });

      if (!propertyResponse.ok) {
        throw new Error('Error al crear la propiedad');
      }

      const newProperty = await propertyResponse.json();

      // Verificar que la propiedad tenga ID
      if (!newProperty.id) {
        console.warn('La propiedad creada no tiene ID:', newProperty);
      }

      // 2. Si hay URL de imagen, crear el registro de imagen
      if (formData.imageUrl && newProperty.id) {
        const imageData = {
          idProperty: newProperty.id,
          file: formData.imageUrl,
          enabled: true
        };

        const imageResponse = await fetch('/api/property-images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(imageData),
        });

        if (!imageResponse.ok) {
          console.warn('Error al subir la imagen, pero la propiedad se creó correctamente');
        }
      }

      // Reset form
      setFormData({
        name: '',
        address: '',
        price: 0,
        codeInternal: '',
        year: new Date().getFullYear(),
        idOwner: 0,
        imageUrl: '',
      });
      setImagePreview('');
      setError('');
      
      onPropertyCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🏠 Crear Nueva Propiedad</h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Imagen */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">
              📸 URL de Imagen de la Propiedad
            </label>
            <div className="flex flex-col space-y-4">
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleImageUrlChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.imageUrl && !isValidUrl(formData.imageUrl) && (
                <p className="text-sm text-red-600">
                  ⚠️ Ingresa una URL válida (debe comenzar con http:// o https://)
                </p>
              )}
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    onError={() => setImagePreview('')}
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">Ingresa una URL para ver la vista previa</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                🏷️ Nombre de la Propiedad *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Casa moderna en zona residencial"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                🔢 Código Interno *
              </label>
              <input
                type="text"
                name="codeInternal"
                value={formData.codeInternal}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PROP-001"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              📍 Dirección *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Calle 123 #45-67, Barrio Los Pinos, Ciudad"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                💰 Precio *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="350000000"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📅 Año *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year || ''}
                onChange={handleInputChange}
                required
                min="1900"
                max={new Date().getFullYear() + 10}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                👤 Propietario *
              </label>
              <select
                name="idOwner"
                value={formData.idOwner === 0 ? '' : formData.idOwner}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar propietario</option>
                {validOwners.map((owner) => (
                  <option key={`owner-${owner.id}`} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold disabled:opacity-50"
            >
              {isLoading ? 'Creando...' : '🏠 Crear Propiedad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
