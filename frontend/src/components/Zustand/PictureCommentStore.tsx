import create from "zustand";
import { CommentDto } from "../../Api/Comment/commentDtos";

interface PictureCommentState {
  comments: CommentDto[];
  replies: CommentDto[];
  sendReplyViewState: boolean | number;
}
export const usePictureCommentStore = create<PictureCommentState>((set) => ({
  comments: [],
  replies: [],
  sendReplyViewState: false,

  setComments: (_comments: CommentDto[]) =>
    set(() => ({ comments: _comments })),

  setCommentsAfterInsert: (_comment: CommentDto[]) =>
    set((state: any) => ({
      comments: [...state.comments, _comment],
    })),

  setReplies: (_replies: CommentDto[]) => set(() => ({ replies: _replies })),

  setsendReplyViewState: (replyViewState: boolean | number) =>
    set(() => ({ sendReplyViewState: replyViewState })),
}));
