import { Comment } from 'src/schemas/comment.schema';
export declare class PicDto {
    title: string;
    description: string;
    like?: number;
    disslike?: number;
    comments: [Comment];
}
