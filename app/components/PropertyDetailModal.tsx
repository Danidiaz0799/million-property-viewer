'use client'

import { PropertyDetails } from '../lib/types';
import Image from 'next/image';
import { useState } from 'react';
import CreateTransactionModal from './CreateTransactionModal';
import { fetchPropertyDetails } from '../services/propertyDetails';

interface PropertyDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyDetails: PropertyDetails | null;
    isLoading: boolean;
    onPropertyDetailsUpdate?: (updatedDetails: PropertyDetails) => void;
}

export default function PropertyDetailModal({
    isOpen,
    onClose,
    propertyDetails,
    isLoading,
    onPropertyDetailsUpdate
}: PropertyDetailModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isCreateTransactionOpen, setIsCreateTransactionOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleTransactionCreated = async () => {
        if (propertyDetails?.property.id && onPropertyDetailsUpdate) {
        setIsRefreshing(true);
        try {
            const updatedDetails = await fetchPropertyDetails(
            propertyDetails.property,
            propertyDetails.property.id
            );
            onPropertyDetailsUpdate(updatedDetails);
            console.log('Detalles de la propiedad actualizados exitosamente');
        } catch (error) {
            console.error('Error al actualizar los detalles de la propiedad:', error);
        } finally {
            setIsRefreshing(false);
        }
        }
        setIsCreateTransactionOpen(false);
    };

    if (!isOpen) return null;

    const formatPrice = (price?: number) => {
        if (typeof price !== 'number') return 'No especificado';
        return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        try {
        return new Date(dateString).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        } catch {
        return dateString;
        }
    };

    const images = propertyDetails?.images?.filter(img => img.enabled !== false) || [];
    const currentImage = images.length > 0 ? images[currentImageIndex] : null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
            className="fixed inset-0 bg-black/60 modal-overlay transition-opacity duration-300"
            onClick={onClose}
        />
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden modal-enter">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 z-10">
                <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">
                    {isLoading ? 'Cargando...' : propertyDetails?.property.name}
                    </h2>
                    <p className="text-blue-100 mt-1">
                    {isLoading ? '' : propertyDetails?.property.address}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                {isLoading ? (
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando detalles de la propiedad...</p>
                </div>
                ) : propertyDetails ? (
                <div className="p-6 space-y-8">
                    {/* Images Gallery */}
                    {images.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Galería de Imágenes
                        </h3>
                        {/* Main Image */}
                        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={currentImage?.file || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'}
                            alt="Imagen de la propiedad"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                            className="object-cover"
                        />
                        {/* Navigation arrows */}
                        {images.length > 1 && (
                            <>
                            <button
                                onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            </>
                        )}
                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                        </div>
                        {/* Thumbnail gallery */}
                        {images.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto pb-2 image-gallery">
                            {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                                index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                                }`}
                            >
                                <Image
                                src={image.file}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                sizes="80px"
                                className="object-cover"
                                />
                            </button>
                            ))}
                        </div>
                        )}
                    </div>
                    )}

                    {/* Property Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Property Information */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Información de la Propiedad
                        </h3>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 info-card">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                            <span className="text-green-700 font-semibold">Precio:</span>
                            <span className="text-2xl font-bold text-green-800">{formatPrice(propertyDetails.property.price)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                            <span className="text-green-700 font-semibold">Código Interno:</span>
                            <span className="font-mono bg-green-200 px-3 py-1 rounded-lg text-green-800">{propertyDetails.property.codeInternal}</span>
                            </div>
                            {propertyDetails.property.year && (
                            <div className="flex justify-between items-center">
                                <span className="text-green-700 font-semibold">Año de Construcción:</span>
                                <span className="font-bold text-green-800">{propertyDetails.property.year}</span>
                            </div>
                            )}
                            <div className="flex justify-between items-center">
                            <span className="text-green-700 font-semibold">Ubicación:</span>
                            <span className="font-medium text-green-800 text-right max-w-xs">{propertyDetails.property.address}</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Owner Information */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Información del Propietario
                        </h3>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 info-card">
                        <div className="space-y-4">
                            {propertyDetails.owner.photo && (
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200">
                                <Image
                                    src={propertyDetails.owner.photo}
                                    alt="Foto del propietario"
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                    onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    }}
                                />
                                </div>
                            </div>
                            )}
                            <div className="flex justify-between items-center">
                            <span className="text-blue-700 font-semibold">Nombre:</span>
                            <span className="font-bold text-blue-800">{propertyDetails.owner.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                            <span className="text-blue-700 font-semibold">ID:</span>
                            <span className="font-mono bg-blue-200 px-3 py-1 rounded-lg text-blue-800">{propertyDetails.owner.id}</span>
                            </div>
                            <div className="flex justify-between items-center">
                            <span className="text-blue-700 font-semibold">Dirección:</span>
                            <span className="font-medium text-blue-800 text-right max-w-xs">{propertyDetails.owner.address}</span>
                            </div>
                            <div className="flex justify-between items-center">
                            <span className="text-blue-700 font-semibold">Fecha de Nacimiento:</span>
                            <span className="font-medium text-blue-800">{formatDate(propertyDetails.owner.birthday)}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Property Traces */}
                    <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Historial de Transacciones
                        {isRefreshing && (
                            <div className="ml-3 animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                        )}
                        </h3>
                        <button
                        onClick={() => setIsCreateTransactionOpen(true)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-colors font-bold flex items-center space-x-2"
                        >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Nueva Transacción</span>
                        </button>
                    </div>

                    {propertyDetails.traces.length > 0 ? (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                        <div className="overflow-x-auto">
                            <table className="w-full traces-table">
                            <thead>
                                <tr className="border-b border-purple-200">
                                <th className="text-left py-3 px-4 font-semibold text-purple-800">Fecha de Venta</th>
                                <th className="text-left py-3 px-4 font-semibold text-purple-800">Tipo</th>
                                <th className="text-right py-3 px-4 font-semibold text-purple-800">Valor</th>
                                <th className="text-right py-3 px-4 font-semibold text-purple-800">Impuesto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propertyDetails.traces.map((trace, index) => (
                                <tr key={index} className="border-b border-purple-100 hover:bg-purple-50/50 transition-colors">
                                    <td className="py-3 px-4 text-purple-700">{formatDate(trace.dateSale)}</td>
                                    <td className="py-3 px-4">
                                    <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {trace.name}
                                    </span>
                                    </td>
                                    <td className="py-3 px-4 text-right font-bold text-purple-800">
                                    {formatPrice(trace.value)}
                                    </td>
                                    <td className="py-3 px-4 text-right text-purple-700">
                                    {formatPrice(trace.tax)}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-200 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600 text-lg">No hay historial de transacciones disponible</p>
                        <p className="text-gray-500 text-sm mt-2">Esta propiedad no tiene registros de ventas anteriores</p>
                        </div>
                    )}
                    </div>
                </div>
                ) : (
                <div className="p-8 text-center">
                    <div className="text-red-600 text-6xl mb-4">⚠️</div>
                    <p className="text-red-600 text-lg">Error al cargar los detalles de la propiedad</p>
                </div>
                )}
            </div>
            </div>
        </div>
        {/* Modal para crear transacciones */}
        {propertyDetails && (
            <CreateTransactionModal
            isOpen={isCreateTransactionOpen}
            onClose={() => setIsCreateTransactionOpen(false)}
            onTransactionCreated={handleTransactionCreated}
            propertyId={propertyDetails.property.id || 0}
            propertyName={propertyDetails.property.name}
            />
        )}
        </div>
    );
}