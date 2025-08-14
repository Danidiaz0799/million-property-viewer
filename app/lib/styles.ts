// Sistema de Diseño Centralizado - Estilos Estándar

// INPUTS Y FORMULARIOS
export const inputStyles = {
  base: "w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium",
  textarea: "w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium resize-none",
  select: "w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-400 font-medium"
};

// BOTONES
export const buttonStyles = {
  primary: "px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
  secondary: "px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200 font-bold shadow-sm border border-gray-300",
  danger: "px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl",
  small: "px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200"
};

// CONTENEDORES Y CARDS
export const containerStyles = {
  card: "bg-white rounded-2xl border border-gray-200 shadow-sm p-6",
  modal: "bg-white rounded-3xl shadow-2xl border border-gray-200",
  section: "bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
};

// HEADERS Y TÍTULOS
export const headerStyles = {
  modalHeader: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl shadow-lg",
  sectionTitle: "text-lg font-bold text-gray-800 mb-4 flex items-center",
  pageTitle: "text-4xl font-bold text-gray-900 mb-6",
  cardTitle: "text-xl font-bold text-gray-900 mb-2"
};

// LABELS Y TEXTO
export const textStyles = {
  label: "flex items-center text-sm font-bold text-gray-800 mb-2",
  error: "bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl shadow-sm",
  success: "bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-xl shadow-sm",
  info: "bg-blue-50 border-2 border-blue-200 text-blue-800 px-4 py-3 rounded-xl shadow-sm"
};

// LAYOUT Y ESPACIADO
export const layoutStyles = {
  container: "container mx-auto px-4 py-6",
  grid: "grid gap-6",
  flexCenter: "flex items-center justify-center",
  spaceBetween: "flex items-center justify-between"
};

// LOADING Y ESTADOS
export const stateStyles = {
  loading: "opacity-50 cursor-not-allowed",
  disabled: "opacity-50 cursor-not-allowed",
  skeleton: "animate-pulse bg-gray-200 rounded"
};

// OVERLAYS Y MODALES
export const overlayStyles = {
  backdrop: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm",
  closeButton: "w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
};

// ICONOS ESTÁNDAR
export const iconStyles = {
  small: "w-4 h-4",
  medium: "w-5 h-5", 
  large: "w-6 h-6",
  withMargin: "mr-2"
};

// FUNCIÓN HELPER PARA COMBINAR CLASES
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
