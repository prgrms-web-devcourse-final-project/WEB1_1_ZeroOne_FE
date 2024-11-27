export interface SubItem {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
  subItems?: SubItem[];
}

export interface FilterState {
  openCategoryId: string | null;
  selectedCategory: string;
  selectedSubItem: string | null;
}
