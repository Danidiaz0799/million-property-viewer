import { PropertyImage } from "../lib/types";

const API_BASE_URL = "http://localhost:5064/api";

export async function fetchPropertyImages(propertyId: number): Promise<PropertyImage[]> {
    const response = await fetch(`${API_BASE_URL}/PropertyImages/property/${propertyId}`);
    if (!response.ok) {
        return [];
    }
    return await response.json();
}
