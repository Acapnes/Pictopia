import create from "zustand";
import { CategoryDto } from "../../Api/User/CategoryDtos/category.dto";
import { CommentDto } from "../../Api/Comment/dtos/commentDto";

interface usePictopiaAccountState {
  draggingNumber: number | null; /// 0 -> default to favorite | 1 -> favorite to default IS DRAGGING
  defaultCategories: CategoryDto[];
  favoriteCategories: CategoryDto[];
  recentlySearches: string[];
}

export const usePictopiaAccountStore = create<usePictopiaAccountState>(
  (set) => ({
    draggingNumber: null,
    defaultCategories: [],
    favoriteCategories: [],
    recentlySearches: [],

    setInitialAccountValues: (
      _defaultCategories: CategoryDto[],
      _favoriteCategories: CategoryDto[],
      _recentlySearches: string[]
    ) => {
      set(() => ({
        defaultCategories: _defaultCategories,
        favoriteCategories: _favoriteCategories,
        recentlySearches: _recentlySearches,
      }));
    },

    setDraggingNumber: (_draggingNumber: number) => {
      set(() => ({ draggingNumber: _draggingNumber }));
    },

    setDefaultCategories: (_defaultCategories: CategoryDto[]) => {
      set(() => ({ defaultCategories: _defaultCategories }));
    },

    setFavoriteCategories: (
      _category: CategoryDto[],
      _categoryIndex: number
    ) => {
      set(() => ({ favoriteCategories: _category }));
    },

    setRecentlySearches: (_recentlySearches: string[]) => {
      set(() => ({ recentlySearches: _recentlySearches }));
    },
  })
);

interface useToastState {
  toastState: boolean;
  toastMassage: string;
}

export const useToastStore = create<useToastState>((set) => ({
  toastState: false,
  toastMassage: "",

  setToastState: (_toastMassage: string) => {
    set((state: any) => ({ toastState: true, toastMassage: _toastMassage }));
    setTimeout(() => {
      set(() => ({ toastState: false }));
    }, 3000);
  },
}));

interface usePictureCommentState {
  currentComments: CommentDto[];
  currentReplies: CommentDto[];
  sendReplyViewState: boolean | number;
}
export const usePictureCommentStore = create<usePictureCommentState>((set) => ({
  currentComments: [],
  currentReplies: [],
  sendReplyViewState: false,

  setCurrentComments: (_currentComments: CommentDto[]) =>
    set(() => ({ currentComments: _currentComments })),
  setCurrentCommentsAfterInsert: (comment: CommentDto[]) =>
    set((state: any) => ({
      currentComments: [...state.currentComments, comment],
    })),
  setCurrentReplies: (_currentReplies: CommentDto[]) =>
    set(() => ({ currentReplies: _currentReplies })),
  setsendReplyViewState: (replyViewState: boolean | number) =>
    set(() => ({ sendReplyViewState: replyViewState })),
}));
