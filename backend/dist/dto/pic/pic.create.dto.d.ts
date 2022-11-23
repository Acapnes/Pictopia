/// <reference types="node" />
import { Category } from 'src/schemas/category.schema';
import { User } from 'src/schemas/user.schema';
export declare class PicCreateDto {
    authorPic: User;
    categories: Category[];
    title: string;
    description: string;
    hashTags: string[];
    picture_file: {
        data: Buffer;
        contentType: string;
    };
}
