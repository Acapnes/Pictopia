/// <reference types="node" />
export declare class CategoryCreationDto {
    title: string;
    category_picture_file: {
        data: Buffer;
        contentType: string;
    };
    creationDate: Date;
}
