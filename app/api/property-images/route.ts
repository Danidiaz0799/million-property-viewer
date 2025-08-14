import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    
    let imageData;
    
    if (contentType?.includes('application/json')) {
      // Manejar datos JSON (URL directa)
      const body = await request.json();
      imageData = {
        idProperty: body.idProperty,
        file: body.file,
        enabled: body.enabled ?? true,
      };
    } else {
      // Manejar FormData (archivo subido) - mantener compatibilidad
      const formData = await request.formData();
      const image = formData.get('image') as File;
      const idProperty = formData.get('idProperty') as string;
      const enabled = formData.get('enabled') as string;

      if (!image || !idProperty) {
        return NextResponse.json(
          { error: 'Image and property ID are required' },
          { status: 400 }
        );
      }

      // Convertir la imagen a base64
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const imageUrl = `data:${image.type};base64,${base64}`;

      imageData = {
        idProperty: parseInt(idProperty),
        file: imageUrl,
        enabled: enabled === 'true',
      };
    }

    if (!imageData.idProperty || !imageData.file) {
      return NextResponse.json(
        { error: 'Property ID and image data are required' },
        { status: 400 }
      );
    }

    // Llamar a la API externa para crear la imagen
    const response = await fetch('http://localhost:5064/api/PropertyImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const newImage = await response.json();
    return NextResponse.json(newImage);

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
