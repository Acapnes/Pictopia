/// <reference types="node" />
import mongoose, { Document } from 'mongoose';
export declare type CategoryDocument = Category & Document;
export declare class Category {
    title: string;
    category_picture_file: {
        data: Buffer;
        contentType: string;
    };
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, any>, {}, {}, {}, {}, "type", Category>;
