import create from "zustand";
import { CategoryDto } from "../../Api/Category/CategoryDtos/category.dto";

interface usePictopiaDNDState {
  defaultCategories: CategoryDto[];
  favoriteCategories: CategoryDto[];
}

export const usePictopiaDNDStore = create<usePictopiaDNDState>((set) => ({
  defaultCategories: [],
  favoriteCategories: [],

  setDefaultCategories: (_defaultCategories: CategoryDto[]) => {
    set((state: any) => ({ defaultCategories: _defaultCategories }));
  },
  
  setFavoriteCategories: (_category: CategoryDto[], _categoryIndex: number) => {
    set(() => ({ favoriteCategories: _category }));
  },
}));
