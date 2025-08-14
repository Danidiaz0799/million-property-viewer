import { PropertyDetails, Owner, PropertyTrace } from '../lib/types';

const API_BASE_URL = "http://localhost:5064/api";

export async function fetchOwner(idOwner: number): Promise<Owner | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/Owners/${idOwner}`);
        if (!response.ok) {
            console.warn(`Owner with ID ${idOwner} not found`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching owner:', error);
        return null;
    }
}

export async function fetchPropertyTraces(idProperty: number): Promise<PropertyTrace[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/PropertyTraces/property/${idProperty}`);
        if (!response.ok) {
        console.warn(`Property traces for property ID ${idProperty} not found`);
        return [];
        }
        const traces = await response.json();
        return Array.isArray(traces) ? traces : [];
    } catch (error) {
        console.error('Error fetching property traces:', error);
        return [];
    }
}

export async function fetchPropertyDetails(property: import('../lib/types').Property, propertyId: number): Promise<PropertyDetails> {
    try {
        const imagesResponse = await fetch(`${API_BASE_URL}/PropertyImages/property/${propertyId}`);
        const images = imagesResponse.ok ? await imagesResponse.json() : [];

        const owner = await fetchOwner(property.idOwner);

        const traces = await fetchPropertyTraces(propertyId);

        return {
        property,
        owner: owner || {
            id: property.idOwner,
            name: 'Propietario no encontrado',
            address: 'N/A',
            birthday: 'N/A'
        },
        images: Array.isArray(images) ? images : [],
        traces
        };
    } catch (error) {
        console.error('Error fetching property details:', error);
        throw error;
    }
}