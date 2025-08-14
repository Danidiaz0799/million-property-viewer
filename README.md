# 🏠 Million Property Viewer

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

## 📖 Descripción

**Million Property Viewer** es una aplicación web moderna para visualizar y buscar propiedades inmobiliarias premium. Desarrollada con Next.js 15, TypeScript y Tailwind CSS, ofrece una experiencia de usuario excepcional con búsqueda en tiempo real, filtros avanzados y optimización de imágenes.

### ✨ Características Principales

- 🏡 **Catálogo de Propiedades**: Visualización de propiedades premium con imágenes optimizadas
- 🔍 **Búsqueda Avanzada**: Filtros por nombre, ubicación y rango de precios
- 📊 **Estadísticas en Tiempo Real**: Dashboard con métricas de propiedades disponibles
- 📱 **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- ⚡ **Rendimiento Optimizado**: Lazy loading, image optimization y SSR
- 🎨 **UI/UX Moderna**: Interfaz elegante con animaciones fluidas

## 🚀 Demo

![Property Viewer Demo](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Million+Property+Viewer+Demo)

### 🌟 Funcionalidades

#### 📋 Listado de Propiedades
- **9 propiedades premium** con información detallada
- **Imágenes optimizadas** de Unsplash con lazy loading
- **Información completa**: Nombre, dirección, precio y detalles
- **Cards responsivas** con hover effects

#### 🔎 Sistema de Búsqueda
- **Búsqueda por nombre** de propiedad
- **Filtro por ubicación** (ciudad/área)
- **Rango de precios** con inputs numéricos
- **Resultados en tiempo real** sin recargar página

#### 📈 Dashboard de Estadísticas
- **Total de propiedades** disponibles
- **Precio promedio** calculado dinámicamente
- **Ciudades disponibles** con contador
- **Iconos descriptivos** para cada métrica

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **Next.js 15.4.6** - React framework con App Router
- **React 18** - Biblioteca de UI components
- **TypeScript** - Tipado estático para JavaScript

### Styling & UI
- **Tailwind CSS 3.4** - Framework de CSS utility-first
- **Geist Font** - Tipografía moderna de Vercel
- **CSS Grid & Flexbox** - Layout responsivo

### Optimización & Performance
- **Next.js Image** - Optimización automática de imágenes
- **Turbopack** - Bundler ultra-rápido para desarrollo
- **ESLint** - Linter para calidad de código
- **PostCSS** - Procesamiento de CSS

### API & Data Management
- **API Routes** - Endpoints internos de Next.js
- **Custom Hooks** - useProperties para manejo de estado
- **TypeScript Interfaces** - Tipado de datos

## 📁 Estructura del Proyecto

```
million-property-viewer/
├── 📁 app/                          # App Router (Next.js 15)
│   ├── 📁 api/                      # API Routes
│   │   └── 📁 properties/           
│   │       └── route.ts             # Endpoint de propiedades
│   ├── 📁 components/               # Componentes React
│   │   ├── Filters.tsx              # Filtros de búsqueda
│   │   ├── PropertyCard.tsx         # Card de propiedad individual
│   │   └── PropertyList.tsx         # Lista de propiedades
│   ├── 📁 hooks/                    # Custom React Hooks
│   │   └── useProperties.ts         # Hook para manejo de propiedades
│   ├── 📁 lib/                      # Utilidades y tipos
│   │   ├── types.ts                 # Interfaces TypeScript
│   │   └── utils.ts                 # Funciones utilitarias
│   ├── 📁 services/                 # Servicios de API
│   │   └── api.ts                   # Cliente de API
│   ├── favicon.ico                  # Favicon del sitio
│   ├── globals.css                  # Estilos globales
│   ├── layout.tsx                   # Layout principal
│   └── page.tsx                     # Página principal
├── 📁 public/                       # Archivos estáticos (vacío - optimizado)
├── 📄 next.config.js                # Configuración de Next.js
├── 📄 package.json                  # Dependencias del proyecto
├── 📄 tailwind.config.ts            # Configuración de Tailwind
├── 📄 tsconfig.json                 # Configuración de TypeScript
└── 📄 README.md                     # Documentación del proyecto
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.17.0
- **npm** >= 9.0.0 o **yarn** >= 1.22.0

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Danidiaz0799/million-property-viewer.git
cd million-property-viewer
```

### 2. Instalar Dependencias

```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install
```

### 3. Ejecutar en Desarrollo

```bash
# Con npm
npm run dev

# Con yarn
yarn dev

# Con pnpm
pnpm dev
```

### 4. Abrir en el Navegador

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con Turbopack

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint para revisar código
```

## 🏗️ Arquitectura del Proyecto

### 🧩 Componentes Principales

#### **PropertyCard.tsx**
```typescript
// Componente individual para mostrar información de propiedad
interface Property {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}
```

#### **Filters.tsx**
```typescript
// Sistema de filtros con búsqueda en tiempo real
interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}
```

#### **useProperties Hook**
```typescript
// Custom hook para manejo de estado de propiedades
const { properties, loading, error, handleSearch } = useProperties();
```

### 🛣️ API Routes

#### **GET /api/properties**
```typescript
// Endpoint para obtener propiedades con filtros opcionales
// Query parameters: name, address, minPrice, maxPrice
// Response: Property[]
```

### 🎨 Sistema de Diseño

#### Colores Principales
- **Primary**: `#0ea5e9` (Sky Blue)
- **Secondary**: `#64748b` (Slate Gray)
- **Success**: `#10b981` (Emerald)
- **Background**: `#f8fafc` (Slate 50)

#### Tipografía
- **Font Family**: Geist Sans / Geist Mono
- **Sizes**: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

#### Responsive Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 📊 Características Técnicas

### ⚡ Optimizaciones de Performance

1. **Image Optimization**
   - Next.js Image component con lazy loading
   - Priority loading para las primeras 3 imágenes
   - Formatos optimizados (WebP, AVIF)

2. **Code Splitting**
   - Componentes cargados bajo demanda
   - Tree shaking automático

3. **SEO Optimization**
   - Metadata estructurada
   - Viewport configuration
   - Semantic HTML

### 🔒 Calidad de Código

- **TypeScript**: Tipado estático completo
- **ESLint**: Reglas de linting configuradas
- **Prettier**: Formateo automático de código
- **Error Boundaries**: Manejo de errores en componentes

### 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Flexbox & Grid**: Layouts modernos y flexibles
- **Touch Friendly**: Botones y elementos optimizados para touch

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Configura las variables de entorno (si las hay)
3. Deploy automático en cada push

### Otros Proveedores

- **Netlify**: Soporte completo para Next.js
- **AWS Amplify**: Deploy con CI/CD
- **Railway**: Deploy rápido y sencillo

## 🤝 Contribución

### Proceso de Contribución

1. **Fork** el repositorio
2. **Crea** una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Usa commits descriptivos

## 📝 Roadmap

### 🎯 Versión 2.0 (Próximamente)

- [ ] **Autenticación de usuarios**
- [ ] **Favoritos y wishlist**
- [ ] **Comparación de propiedades**
- [ ] **Mapa interactivo**
- [ ] **Filtros avanzados** (habitaciones, amenidades)
- [ ] **Integración con APIs reales**
- [ ] **Dashboard de administración**
- [ ] **Notificaciones push**

### 🔧 Mejoras Técnicas

- [ ] **PWA** (Progressive Web App)
- [ ] **Offline support**
- [ ] **Database integration** (PostgreSQL/MongoDB)
- [ ] **API rate limiting**
- [ ] **Unit & Integration tests**
- [ ] **Performance monitoring**

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Steven Díaz** - *Desarrollo inicial* - [@Danidiaz0799](https://github.com/Danidiaz0799)

## 🙏 Agradecimientos

- **Next.js Team** - Por el increíble framework
- **Vercel** - Por las herramientas de desarrollo
- **Tailwind CSS** - Por el sistema de diseño
- **Unsplash** - Por las imágenes de alta calidad

---

<div align="center">

**🏠 Million Property Viewer** - *Encuentra tu hogar ideal*

[🌐 Demo](https://million-property-viewer.vercel.app) | [📖 Docs](https://github.com/Danidiaz0799/million-property-viewer) | [🐛 Issues](https://github.com/Danidiaz0799/million-property-viewer/issues)

</div>
