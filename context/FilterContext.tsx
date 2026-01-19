'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { FilterState, ProductFilters } from '@/types';

interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  applyFilters: (filters: ProductFilters) => void;
}

const defaultFilters: FilterState = {
  category: 'Any',
  gender: 'Any',
  size: 'Any',
  colors: [],
  searchQuery: '',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);

  const setFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const applyFilters = useCallback((productFilters: ProductFilters) => {
    setFiltersState(prev => {
      // Basic equality check to avoid unnecessary updates if deep compare logic isn't used
      // But purely creating a new object is usually fine if dependencies are stable.
      // The main issue was the function reference changing.
      return {
        ...prev,
        category: productFilters.category,
        gender: productFilters.gender,
        size: productFilters.size,
        colors: productFilters.colors,
      };
    });
  }, []);

  const value: FilterContextType = {
    filters,
    setFilters,
    resetFilters,
    applyFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
