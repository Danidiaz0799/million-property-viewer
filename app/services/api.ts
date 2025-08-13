import { Property } from "../lib/types";

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function fetchProperties(filters: PropertyFilters): Promise<Property[]> {
  try {
    const queryParams = new URLSearchParams();
    
    // Iterar sobre el objeto filters y añadir solo los valores que no sean nulos o indefinidos
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`/api/properties?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    const data = await response.json();
    return data as Property[];
  } catch (error) {
    // Re-lanzar el error para que pueda ser manejado por el componente que llama
    throw error;
  }
}
