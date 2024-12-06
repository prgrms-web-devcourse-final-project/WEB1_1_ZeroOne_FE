import { JOB_CATEGORIES } from '../model';

export const findCategoryName = (id: string) => {
  for (const category of JOB_CATEGORIES) {
    if (category.subItems) {
      for (const subItem of category.subItems) {
        if (subItem.id === id) {
          return subItem.name;
        }
      }
    }
  }
  return '';
};
