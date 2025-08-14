import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Llamar a la API externa para obtener owners
    const response = await fetch('http://localhost:5064/api/Owners', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const owners = await response.json();
    
    // Temporal: Agregar ID a los owners mientras el backend no lo incluye
    const ownersWithId = Array.isArray(owners) 
      ? owners.map((owner, index) => ({
          id: index + 1, // ID temporal basado en el índice
          ...owner
        }))
      : [];
    
    return NextResponse.json(ownersWithId);

  } catch (error) {
    console.error('Error fetching owners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch owners' },
      { status: 500 }
    );
  }
}
