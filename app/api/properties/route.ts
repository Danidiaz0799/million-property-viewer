import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Obtener parámetros reales que acepta la API
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const name = searchParams.get('name') || '';
    const address = searchParams.get('address') || '';
    const priceMin = searchParams.get('priceMin') || '';
    const priceMax = searchParams.get('priceMax') || '';
    const sortField = searchParams.get('sortField') || '';
    const sortDescending = searchParams.get('sortDescending') || 'false';

    // Construir URL para la API externa con parámetros reales
    const apiUrl = new URL('http://localhost:5064/api/Properties');
    apiUrl.searchParams.set('page', page);
    apiUrl.searchParams.set('pageSize', pageSize);
    
    if (name) apiUrl.searchParams.set('name', name);
    if (address) apiUrl.searchParams.set('address', address);
    if (priceMin) apiUrl.searchParams.set('priceMin', priceMin);
    if (priceMax) apiUrl.searchParams.set('priceMax', priceMax);
    if (sortField) apiUrl.searchParams.set('sortField', sortField);
    apiUrl.searchParams.set('sortDescending', sortDescending);

    // Llamar a la API externa
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const apiData = await response.json();
    
    // La API externa devuelve { data, totalCount, page, pageSize }
    const { data: properties, totalCount } = apiData;

    return NextResponse.json({
      properties: properties || [],
      totalCount: totalCount || 0,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages: Math.ceil((totalCount || 0) / parseInt(pageSize))
    });

  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch properties',
        properties: [],
        totalCount: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      },
      { status: 500 }
    );
  }
}
