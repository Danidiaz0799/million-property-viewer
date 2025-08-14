'use client';

import { useState } from 'react';
import Image from 'next/image';
import { containerStyles, headerStyles, textStyles, overlayStyles, iconStyles } from '@/app/lib/styles';

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

        if (url && isValidUrl(url)) {
        setImagePreview(url);
        } else {
        setImagePreview('');
        }
    };
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
        if (!newProperty.id) {
            console.warn('La propiedad creada no tiene ID:', newProperty);
        }

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
        <div className={overlayStyles.backdrop}>
        <div className={containerStyles.modal + " max-w-2xl w-full max-h-[90vh] overflow-y-auto"}>
            {/* Header */}
            <div className={headerStyles.modalHeader}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className={iconStyles.large} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold">Crear Nueva Propiedad</h2>
                </div>
                <button
                onClick={handleClose}
                className={overlayStyles.closeButton}
                title="Cerrar modal"
                >
                <svg className={iconStyles.large} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gray-50/30">
            {error && (
                <div className={textStyles.error}>
                <div className="flex items-center">
                    <svg className={`${iconStyles.medium} ${iconStyles.withMargin} text-red-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{error}</span>
                </div>
                </div>
            )}

            {/* Imagen */}
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                URL de Imagen de la Propiedad
                </label>
                <div className="flex flex-col space-y-4">
                <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl || ''}
                    onChange={handleImageUrlChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400"
                />
                {formData.imageUrl && !isValidUrl(formData.imageUrl) && (
                    <p className="text-sm text-red-600 font-medium">
                    ⚠️ Ingresa una URL válida (debe comenzar con http:// o https://)
                    </p>
                )}
                {imagePreview ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
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
                    <div className="w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                    <div className="text-center">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-600 font-medium">Ingresa una URL para ver la vista previa</p>
                    </div>
                    </div>
                )}
                </div>
            </div>

            {/* Información Básica */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Información Básica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Nombre de la Propiedad *
                    </label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium"
                    placeholder="Casa moderna en zona residencial"
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
                    <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    Código Interno *
                    </label>
                    <input
                    type="text"
                    name="codeInternal"
                    value={formData.codeInternal}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium"
                    placeholder="PROP-001"
                    />
                </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dirección *
                </label>
                <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium resize-none"
                placeholder="Calle 123 #45-67, Barrio Los Pinos, Ciudad"
                />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Detalles Adicionales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Precio *
                    </label>
                    <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium"
                    placeholder="350000000"
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
                    <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8" />
                    </svg>
                    Año *
                    </label>
                    <input
                    type="number"
                    name="year"
                    value={formData.year || ''}
                    onChange={handleInputChange}
                    required
                    min="1900"
                    max={new Date().getFullYear() + 10}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium"
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
                    <svg className="w-4 h-4 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Propietario *
                    </label>
                    <select
                    name="idOwner"
                    value={formData.idOwner === 0 ? '' : formData.idOwner}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium"
                    >
                    <option value="" className="text-gray-500">Seleccionar propietario</option>
                    {validOwners.map((owner) => (
                        <option key={`owner-${owner.id}`} value={owner.id} className="text-gray-900">
                        {owner.name}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-bold shadow-sm border border-gray-300"
                >
                Cancelar
                </button>
                <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold disabled:opacity-50 shadow-lg disabled:shadow-none"
                >
                {isLoading ? (
                    <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando...
                    </span>
                ) : (
                    '🏠 Crear Propiedad'
                )}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}
