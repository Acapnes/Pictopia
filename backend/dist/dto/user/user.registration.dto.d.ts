/// <reference types="node" />
export declare class UserRegistrationDto {
    name?: string;
    email: string;
    username: string;
    creationDate: Date;
    avatar?: {
        data: Buffer;
        contentType: string;
    };
    confrimed?: boolean;
    bio?: string;
    password: string;
}
