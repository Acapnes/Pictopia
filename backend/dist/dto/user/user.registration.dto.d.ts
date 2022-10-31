/// <reference types="node" />
export declare class UserRegistrationDto {
    name?: string;
    email: string;
    username: string;
    avatar?: {
        data: Buffer;
        contentType: string;
    };
    birthDate: string;
    confrimed?: boolean;
    bio?: string;
    password: string;
}
