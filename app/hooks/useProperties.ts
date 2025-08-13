import { useState, useEffect } from "react";
import { Property } from "../lib/types";
import { PropertyFilters, fetchProperties } from "../services/api";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>({});

  const handleSearch = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchProperties(filters);
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching properties');
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, [filters]);

  return {
    properties,
    isLoading,
    error,
    handleSearch
  };
}
