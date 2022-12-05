import create from "zustand";
import { CategoryDto } from "../../Api/User/CategoryDtos/category.dto";
import { CommentDto } from "../../Api/Comment/dtos/commentDto";
import { UserDto } from "../../Api/User/UserDtos/userDto";

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

interface useToastState {
  toastState: boolean;
  toastMassage: string;
}

export const useToastStore = create<useToastState>((set) => ({
  toastState: false,
  toastMassage: "",

  setToastState: (_toastMassage: string) => {
    set((state: any) => ({ toastState: true, toastMassage: _toastMassage }));
    // setTimeout(()=>{
    //   set((state: any) => ({ defaultToastState: false }));
    // },3000)
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
  setCurrentReplies: (_currentReplies: CommentDto[]) =>
    set(() => ({ currentReplies: _currentReplies })),
  setsendReplyViewState: (replyViewState: boolean | number) =>
    set(() => ({ sendReplyViewState: replyViewState })),
}));
