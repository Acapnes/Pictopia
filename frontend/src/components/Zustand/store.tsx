import create from "zustand";
import { CategoryDto } from "../../Api/User/Category/categoryDtos";
import { CommentDto } from "../../Api/Comment/commentDtos";
import { UserDto } from "../../Api/User/UserDtos/userDto";

interface usePictopiaAccountState {
  draggingNumber: number | null; /// 0 -> default to favorite | 1 -> favorite to default IS DRAGGING
  defaultCategories: CategoryDto[];
  favoriteCategories: CategoryDto[];
  lastSearches: string[];
}

export const usePictopiaPublicAccountStore = create<usePictopiaAccountState>(
  (set) => ({
    draggingNumber: null,
    defaultCategories: [],
    favoriteCategories: [],
    lastSearches: [],

    setInitialAccountValues: (
      _defaultCategories: CategoryDto[],
      _favoriteCategories: CategoryDto[],
      lastSearches: string[]
    ) => {
      set(() => ({
        defaultCategories: _defaultCategories,
        favoriteCategories: _favoriteCategories,
        lastSearches: lastSearches,
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

    setRecentlySearches: (lastSearches: string[]) => {
      set(() => ({ lastSearches: lastSearches }));
    },
  })
);

interface usePictopiaProfileState {
  profileSocials: UserDto["userSocials"];
}

export const usePictopiaPublicProfileStore = create<usePictopiaProfileState>(
  (set) => ({
    profileSocials: [],

    setInitialProfileValues: (_socials: UserDto["userSocials"]) => {
      set(() => ({
        profileSocials: _socials,
      }));
    },

    setProfileSocials: (_socials: UserDto["userSocials"]) => {
      set(() => ({ profileSocials: _socials }));
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
