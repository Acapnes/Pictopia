/// <reference types="node" />
export declare class UserCredentialsDto {
    name: string;
    email: string;
    username: string;
    avatar: {
        data: Buffer;
        contentType: string;
    };
    birthDate: string;
    confrimed: boolean;
    bio: string;
}
