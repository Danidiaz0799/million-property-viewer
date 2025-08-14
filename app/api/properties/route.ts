import { NextRequest, NextResponse } from 'next/server';
import { Property } from '../../lib/types';

// Datos mock para las propiedades
const mockProperties: Property[] = [
  {
    idOwner: '1',
    name: 'Luxury Downtown Apartment',
    address: '123 Fifth Avenue, New York, NY',
    price: 850000,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '2',
    name: 'Modern Family House',
    address: '456 Oak Street, Los Angeles, CA',
    price: 1200000,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '3',
    name: 'Cozy Beach Cottage',
    address: '789 Ocean Drive, Miami, FL',
    price: 650000,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '4',
    name: 'Urban Loft',
    address: '321 Industrial Blvd, Chicago, IL',
    price: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '5',
    name: 'Mountain View Villa',
    address: '654 Alpine Road, Denver, CO',
    price: 950000,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '6',
    name: 'Historic Brownstone',
    address: '987 Heritage Lane, Boston, MA',
    price: 725000,
    imageUrl: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '7',
    name: 'Luxury Penthouse',
    address: '555 Park Avenue, New York, NY',
    price: 2500000,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '8',
    name: 'Suburban Family Home',
    address: '123 Maple Street, Seattle, WA',
    price: 750000,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    idOwner: '9',
    name: 'Modern Townhouse',
    address: '456 Pine Street, Portland, OR',
    price: 625000,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Simular un pequeño delay como una API real
    await new Promise(resolve => setTimeout(resolve, 200));

    const { searchParams } = new URL(request.url);
    
    // Obtener parámetros de filtrado
    const nameFilter = searchParams.get('name');
    const addressFilter = searchParams.get('address');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    // Filtrar propiedades basado en los parámetros
    let filteredProperties = mockProperties;

    if (nameFilter) {
      filteredProperties = filteredProperties.filter(property =>
        property.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (addressFilter) {
      filteredProperties = filteredProperties.filter(property =>
        property.address.toLowerCase().includes(addressFilter.toLowerCase())
      );
    }

    if (minPrice) {
      const min = parseInt(minPrice);
      if (!isNaN(min)) {
        filteredProperties = filteredProperties.filter(property =>
          property.price >= min
        );
      }
    }

    if (maxPrice) {
      const max = parseInt(maxPrice);
      if (!isNaN(max)) {
        filteredProperties = filteredProperties.filter(property =>
          property.price <= max
        );
      }
    }

    return NextResponse.json(filteredProperties);
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in properties API:', error);
    }
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
