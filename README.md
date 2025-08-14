# Million Property Viewer

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

Plataforma full‑stack para visualizar y gestionar inventario inmobiliario (propiedades, propietarios, imágenes y transacciones) con foco en consistencia, escalabilidad y velocidad de entrega.

## Visión y alcance

- Centraliza propiedades, dueños, galería de imágenes y trazabilidad de cambios.
- Búsqueda y filtros por criterios de negocio (nombre, ubicación, precio, etc.).
- Experiencia moderna, responsiva y consistente gracias a un sistema de diseño unificado.
- API robusta para integraciones y automatizaciones.

## Arquitectura de referencia

Sistema compuesto por un frontend en Next.js (App Router) y un backend en .NET 8 con MongoDB, conectados mediante API Routes que actúan como proxy/antena del cliente.

```
┌──────────────────────────────┐
│  Frontend (Next.js + TS)    │
│  • App Router               │
│  • Diseño centralizado      │
│  • API Routes (proxy)       │
└───────────────▲─────────────┘
                │ HTTP
┌───────────────┴─────────────┐
│  Backend (.NET 8, Clean)    │
│  • Casos de uso / Servicios │
│  • Repositorios MongoDB     │
│  • Swagger/OpenAPI          │
└───────────────▲─────────────┘
                │ Driver
┌───────────────┴─────────────┐
│        MongoDB (NoSQL)      │
└──────────────────────────────┘
```

### ¿Por qué esta arquitectura?

- Desacoplamiento: el dominio de negocio vive en el backend; el frontend se centra en experiencia.
- Escalabilidad: Clean Architecture permite evolucionar tecnología sin tocar reglas de negocio.
- Time‑to‑market: Next.js + API Routes simplifican la integración y despliegue del cliente.
- Mantenibilidad: TypeScript, estilos centralizados y capas bien definidas reducen deuda técnica.
- Observabilidad: Swagger en backend y manejo uniforme de errores.

## Atributos de calidad

- Consistencia visual: sistema de estilos centralizado en `app/lib/styles.ts` y variables globales.
- Rendimiento: optimización de imágenes, paginación y carga diferida donde aplica.
- Seguridad básica: CORS, validaciones y saneamiento de entrada.
- Testabilidad: dominio desacoplado y contratos claros entre capas.

## Estructura del proyecto (frontend)

```
app/
├─ api/                 # API Routes (proxy al backend)
│  └─ properties/route.ts
├─ components/          # UI (cards, listas, filtros, modales)
├─ hooks/               # Lógica de estado (p.ej., useProperties)
├─ lib/                 # Estilos, tipos y utilidades
│  ├─ styles.ts         # Diseño centralizado (inputs, botones, contenedores)
│  ├─ types.ts          # Tipos/contratos de frontend
│  └─ utils.ts          # Funciones de soporte
├─ services/            # Cliente HTTP y servicios de dominio
│  └─ api.ts            # Consumo del backend
├─ globals.css          # Variables y utilidades CSS globales
└─ page.tsx             # Página principal
```

> Nota: Este repositorio alberga el frontend. El backend .NET 8 expone la API REST (propiedades, propietarios, imágenes y trazas) aplicando Clean Architecture sobre MongoDB. Consulta el README del backend para detalles operativos (endpoints, filtros y configuración).

## Capacidades clave (vista de negocio)

- Gestión de propiedades: alta, edición, baja y visualización con paginación.
- Gestión de propietarios: asociación 1:N entre propietario y propiedades.
- Galería por propiedad: múltiples imágenes con habilitación/deshabilitación.
- Trazabilidad: historial de transacciones y cambios relevantes.
- Búsqueda avanzada: por nombre, dirección y rango de precios; combinable.

## Decisiones de diseño y trade‑offs

- Clean Architecture: más archivos y abstracción a cambio de extensibilidad y pruebas sencillas.
- MongoDB: flexibilidad de esquema para atributos variables en propiedades.
- Next.js (App Router): DX y SSR/SSG cuando se necesite; uso moderado de API Routes como proxy para simplificar CORS y seguridad del cliente.

## Puesta en marcha

Requisitos: Node.js 18+, acceso a una API .NET 8 operativa y MongoDB.

1) Instalar dependencias del frontend

```bash
npm install
```

2) Ejecutar en desarrollo

```bash
npm run dev
```

Frontend: http://localhost:3000

Backend (referencia): http://localhost:5064 (Swagger en `/swagger`).

---

Autor: Steven Diaz.
