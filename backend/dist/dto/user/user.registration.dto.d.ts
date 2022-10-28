/// <reference types="node" />
import { PicDto } from '../pic/pic.dto';
export declare class UserRegistrationDto {
    name?: string;
    email: string;
    username: string;
    avatar?: {
        data: Buffer;
        contentType: string;
    };
    savedPictures: PicDto[];
    birthDate: string;
    confrimed?: boolean;
    bio?: string;
    password: string;
}
