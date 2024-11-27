import { useCallback, useState } from 'react';

import type { FilterState, Category } from './types';

interface UseSidebarFilterProps {
  categories: Category[];
  defaultCategory?: string;
  initialState?: Partial<FilterState>;
  onFilterChange?: (categoryId: string, subItemId: string | null) => void;
}

export const useSidebarFilter = ({
  // categories,
  defaultCategory = 'all',
  initialState = {},
  onFilterChange,
}: UseSidebarFilterProps) => {
  const [filterState, setFilterState] = useState<FilterState>({
    openCategoryId: null,
    selectedCategory: defaultCategory,
    selectedSubItem: null,
    ...initialState,
  });

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      setFilterState(prev => {
        const newState = {
          openCategoryId: prev.openCategoryId === categoryId ? null : categoryId,
          selectedCategory: categoryId,
          selectedSubItem: null,
        };

        onFilterChange?.(categoryId, null);
        return newState;
      });
    },
    [onFilterChange],
  );

  const handleSubItemClick = useCallback(
    (categoryId: string, subItemId: string) => {
      setFilterState(prev => {
        const newState = {
          ...prev,
          selectedCategory: categoryId,
          selectedSubItem: subItemId,
        };

        onFilterChange?.(categoryId, subItemId);
        return newState;
      });
    },
    [onFilterChange],
  );

  return {
    filterState,
    handleCategoryClick,
    handleSubItemClick,
  };
};
