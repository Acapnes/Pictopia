import { UserDto } from '../user/user.dto';
export declare class PicCreateDto {
    authorPic: UserDto;
    title: string;
    description: string;
    like?: number;
    disslike?: number;
}
