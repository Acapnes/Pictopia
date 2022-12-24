/// <reference types="node" />
import { UserDto } from '../user/user.dto';
export declare class PicDto {
    authorPic: UserDto;
    title: string;
    description: string;
    creationDate: Date;
    picture_file: {
        data: Buffer;
        contentType: string;
    };
}
