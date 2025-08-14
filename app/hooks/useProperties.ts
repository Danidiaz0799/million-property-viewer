import { useState, useEffect } from "react";
import { Property } from "../lib/types";
import { PropertyFilters, fetchProperties } from "../services/api";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>({ page: 1, pageSize: 10 });

  const handleSearch = (newFilters: PropertyFilters) => {
    // Si vienen filtros vacíos, volvemos al estado base (como carga inicial)
    const hasKeys = Object.keys(newFilters || {}).length > 0;
    if (!hasKeys) {
      setFilters({ page: 1, pageSize: 10 });
      return;
    }
    // Si hay filtros, partimos del estado base para no arrastrar filtros antiguos
    setFilters({ page: 1, pageSize: 10, ...newFilters });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { items, totalCount } = await fetchProperties(filters);
        setProperties(items);
        setTotalCount(totalCount);
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
    totalCount,
    isLoading,
    error,
    filters,
    handleSearch,
    handlePageChange,
  };
}
