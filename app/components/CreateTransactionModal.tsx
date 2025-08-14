'use client';

import { useState } from 'react';

interface CreateTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTransactionCreated: () => void;
    propertyId: number;
    propertyName: string;
}

interface TransactionFormData {
    dateSale: string;
    name: string;
    value: number;
    tax: number;
}

export default function CreateTransactionModal({
    isOpen,
    onClose,
    onTransactionCreated,
    propertyId,
    propertyName
}: CreateTransactionModalProps) {
    const [formData, setFormData] = useState<TransactionFormData>({
        dateSale: new Date().toISOString().split('T')[0],
        name: '',
        value: 0,
        tax: 0,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: name === 'value' || name === 'tax'
            ? Number(value)
            : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
        const response = await fetch('/api/property-traces', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            ...formData,
            idProperty: propertyId,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al crear la transacción');
        }

        // Reset form
        setFormData({
            dateSale: new Date().toISOString().split('T')[0],
            name: '',
            value: 0,
            tax: 0,
        });

        onTransactionCreated();
        onClose();
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
        setIsLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
        }).format(amount);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
            <div className="flex justify-between items-center">
                <div>
                <h2 className="text-2xl font-bold">💼 Nueva Transacción</h2>
                <p className="text-green-100 mt-1">{propertyName}</p>
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                📅 Fecha de Transacción *
                </label>
                <input
                type="date"
                name="dateSale"
                value={formData.dateSale}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                🏷️ Nombre/Descripción de la Transacción *
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Venta de propiedad"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    💰 Valor de Transacción *
                </label>
                <input
                    type="number"
                    name="value"
                    value={formData.value || ''}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="350000000"
                />
                {formData.value > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(formData.value)}
                    </p>
                )}
                </div>

                <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    🧾 Impuestos
                </label>
                <input
                    type="number"
                    name="tax"
                    value={formData.tax || ''}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                />
                {formData.tax > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(formData.tax)}
                    </p>
                )}
                </div>
            </div>

            {/* Summary */}
            {formData.value > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-bold text-green-800 mb-2">📊 Resumen de Transacción</h4>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                    <span className="text-green-700">Valor Base:</span>
                    <span className="font-semibold">{formatCurrency(formData.value)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-green-700">Impuestos:</span>
                    <span className="font-semibold">{formatCurrency(formData.tax)}</span>
                    </div>
                    <div className="border-t border-green-200 pt-1 mt-2">
                    <div className="flex justify-between text-green-800 font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(formData.value + formData.tax)}</span>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
                <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bold"
                >
                Cancelar
                </button>
                <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-colors font-bold disabled:opacity-50"
                >
                {isLoading ? 'Creando...' : '💼 Crear Transacción'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}