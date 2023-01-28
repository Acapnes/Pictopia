import create from "zustand";
import { CategoryDto } from "../../Api/User/Category/categoryDtos";

interface AccountCategoryState {
  allCategories: CategoryDto[];
  favoriteCategories: CategoryDto[];
}

export const useAccountCategoryStore = create<AccountCategoryState>((set) => ({
  allCategories: [],
  favoriteCategories: [],

  setInitialAccountValues: (
    _defaultCategories: CategoryDto[],
    _favoriteCategories: CategoryDto[]
  ) => {
    set(() => ({
      defaultCategories: _defaultCategories,
      favoriteCategories: _favoriteCategories,
    }));
  },

  setAllCategories: (_allCategories: CategoryDto[]) => {
    set(() => ({ allCategories: _allCategories }));
  },

  setFavoriteCategories: (_category: CategoryDto[], _categoryIndex: number) => {
    set(() => ({ favoriteCategories: _category }));
  },
}));
