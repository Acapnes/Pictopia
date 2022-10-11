/// <reference types="node" />
import { UserDto } from '../user/user.dto';
export declare class PicCreateDto {
    authorPic: UserDto;
    title: string;
    description: string;
    picture_file: {
        data: Buffer;
        contentType: string;
    };
}
