import { Property } from "../lib/types";

export interface PropertyFilters {
  name?: string;
  address?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  pageSize?: number;
}

const API_BASE_URL = "http://localhost:5064/api";

function mapFiltersToApiParams(filters: PropertyFilters): Record<string, string> {
  const params: Record<string, string> = {};
  if (filters.name) params["name"] = filters.name;
  if (filters.address) params["address"] = filters.address;
  if (filters.priceMin !== undefined) params["priceMin"] = filters.priceMin.toString();
  if (filters.priceMax !== undefined) params["priceMax"] = filters.priceMax.toString();
  if (filters.page !== undefined) params["page"] = filters.page.toString();
  if (filters.pageSize !== undefined) params["pageSize"] = filters.pageSize.toString();
  return params;
}

export async function fetchProperties(filters: PropertyFilters): Promise<{ items: Property[]; totalCount: number }> {
  try {
    const params = mapFiltersToApiParams(filters);
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/properties?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    const data = await response.json();
    if (data && Array.isArray(data.data)) {
      return {
        items: data.data,
        totalCount: data.totalCount ?? data.data.length,
      };
    }
    if (Array.isArray(data)) {
      return { items: data, totalCount: data.length };
    }
    return { items: [], totalCount: 0 };
  } catch (error) {
    throw error;
  }
}