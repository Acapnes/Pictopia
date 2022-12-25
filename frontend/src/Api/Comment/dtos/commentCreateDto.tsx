export interface CommentCreateDto {
  destPicture: string;
  parentId?: string;
  comment: string;
  creationDate: Date;
}
