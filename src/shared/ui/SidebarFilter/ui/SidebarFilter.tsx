import cn from 'classnames';
import { memo } from 'react';


import { useSidebarFilter } from '../model';
import type { Category, FilterState } from '../types';
import styles from './SidebarFilter.module.scss';

import { TripleDot } from '@/shared/ui';

export interface SidebarFilterProps {
  categories: Category[];
  defaultCategory?: string;
  initialState?: Partial<FilterState>;
  onFilterChange?: (categoryId: string, subItemId: string | null) => void;
  className?: string;
}

export const SidebarFilter = memo(({
  categories,
  defaultCategory = 'all',
  initialState,
  onFilterChange,
  className,
}: SidebarFilterProps) => {
  const {
    filterState,
    handleCategoryClick,
    handleSubItemClick,
  } = useSidebarFilter({
    categories,
    defaultCategory,
    initialState,
    onFilterChange,
  });

  return (
    <nav className={cn(styles.container, className)}>
      <ul className={styles.categoryList}>
        {categories.map(category => (
          <li className={styles.categoryItem} key={category.id}>
            <button
              className={cn(styles.categoryButton, {
                [styles.selected]: filterState.selectedCategory === category.id
              })}
              onClick={() => { handleCategoryClick(category.id); }}
              type="button"
            >
              <span>{category.name}</span>
              {category.count !== undefined && (
                <span className={styles.count}>
                  ({category.count})
                </span>
              )}
            </button>

            {category.subItems && filterState.openCategoryId === category.id && (
              <ul className={styles.subList}>
                <TripleDot />
                {category.subItems.map(subItem => (
                  <li className={styles.subItem} key={subItem.id}>
                    <button
                      className={cn(styles.subItemButton, {
                        [styles.selected]: filterState.selectedSubItem === subItem.id
                      })}
                      onClick={() => { handleSubItemClick(category.id, subItem.id); }}
                      type="button"
                    >
                      {subItem.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
});

SidebarFilter.displayName = 'SidebarFilter';