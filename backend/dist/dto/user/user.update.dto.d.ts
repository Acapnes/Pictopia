/// <reference types="node" />
export declare class UserUpdateDto {
    name: string;
    username: string;
    avatar: {
        data: Buffer;
        contentType: string;
    };
    birthDate: string;
    bio: string;
}
