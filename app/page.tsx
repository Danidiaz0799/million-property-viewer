'use client'

import Filters from './components/Filters';
import PropertyList from './components/PropertyList';
import CreatePropertyModal from './components/CreatePropertyModal';
import { useProperties } from './hooks/useProperties';
import { useState, useEffect } from 'react';
import { buttonStyles, containerStyles } from '@/app/lib/styles';

export default function Home() {
  const { properties, totalCount, isLoading, error, filters, handleSearch, handlePageChange } = useProperties();
  const [isCreatePropertyOpen, setIsCreatePropertyOpen] = useState(false);
    const [owners, setOwners] = useState<Array<{ id: number; name: string; address: string; photo?: string }>>([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('/api/owners');
        if (response.ok) {
          const ownersData = await response.json();
          if (Array.isArray(ownersData)) {
            const validOwners = ownersData.filter(owner =>
              owner &&
              typeof owner.id === 'number' &&
              typeof owner.name === 'string' &&
              owner.name.trim() !== ''
            );
            setOwners(validOwners);
          } else {
            console.warn('ownersData no es un array:', ownersData);
            setOwners([]);
          }
        } else {
          console.error('Error en la respuesta de owners:', response.status);
          setOwners([]);
        }
      } catch (error) {
        console.error('Error fetching owners:', error);
        setOwners([]);
      }
    };
    fetchOwners();
  }, []);

  const handlePropertyCreated = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header mejorado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Encuentra tu Hogar Ideal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Descubre propiedades exclusivas en las mejores ubicaciones. Tu nuevo hogar te está esperando.
          </p>
          {/* Botón para crear propiedad */}
          <button
            onClick={() => setIsCreatePropertyOpen(true)}
            className={`${buttonStyles.primary} text-lg mx-auto`}
          >
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Publicar Nueva Propiedad</span>
            </div>
          </button>
        </div>
        <Filters onSearch={handleSearch} />
        <PropertyList
          properties={properties}
          isLoading={isLoading}
          error={error}
        />
        {totalCount > (filters.pageSize || 10) && (
          <div className="flex justify-center mt-12">
            <div className={containerStyles.card}>
              <div className="flex items-center space-x-4">
                <button
                  className={buttonStyles.secondary}
                  onClick={() => handlePageChange((filters.page || 1) - 1)}
                  disabled={(filters.page || 1) <= 1}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Anterior
                  </div>
                </button>
                <div className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <span className="text-sm text-gray-600 mr-2">Página</span>
                  <span className="text-xl font-bold text-blue-600">{filters.page || 1}</span>
                  <span className="text-sm text-gray-600 ml-2">de {Math.ceil(totalCount / (filters.pageSize || 10))}</span>
                </div>
                <button
                  className={buttonStyles.secondary}
                  onClick={() => handlePageChange((filters.page || 1) + 1)}
                  disabled={((filters.page || 1) * (filters.pageSize || 10)) >= totalCount}
                >
                  <div className="flex items-center">
                    <span>Siguiente</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
              {/* Información adicional */}
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  Mostrando {((filters.page || 1) - 1) * (filters.pageSize || 10) + 1} - {Math.min((filters.page || 1) * (filters.pageSize || 10), totalCount)} de {totalCount} propiedades
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer profesional */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Property Viewer</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Tu plataforma de confianza para encontrar la propiedad perfecta. 
                Conectamos sueños con realidades inmobiliarias desde 2024.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.997 1.482-1.997.699 0 1.037.219 1.037 1.142 0 .697-.442 1.738-.669 2.700-.19.801.4 1.456 1.2 1.456 1.44 0 2.547-1.519 2.547-3.707 0-1.938-1.392-3.297-3.38-3.297-2.303 0-3.658 1.728-3.658 3.514 0 .697.27 1.442.608 1.849.067.08.076.149.056.231-.061.254-.196.796-.223.907-.035.146-.116.177-.268.107-1.001-.465-1.624-1.926-1.624-3.1 0-2.556 1.856-4.901 5.35-4.901 2.811 0 4.996 2.001 4.996 4.676 0 2.789-1.756 5.033-4.191 5.033-.818 0-1.588-.426-1.849-1.001l-.503 1.916c-.181.695-.669 1.566-.996 2.097.751.233 1.547.359 2.372.359 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-blue-900 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </div>
            </div>
            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-300">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">🏠 Propiedades</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">🔍 Búsqueda Avanzada</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">📊 Análisis de Mercado</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">👥 Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">📞 Contacto</a></li>
              </ul>
            </div>
            {/* Información de contacto */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-300">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">info@propertyviewer.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">123 Property St, Real Estate City</span>
                </div>
              </div>
            </div>
          </div>
          {/* Línea divisoria y copyright */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2024 Property Viewer. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Modal para crear propiedades */}
      <CreatePropertyModal
        isOpen={isCreatePropertyOpen}
        onClose={() => setIsCreatePropertyOpen(false)}
        onPropertyCreated={handlePropertyCreated}
        owners={owners}
      />
    </main>
  );
}