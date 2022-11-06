import { IsNotEmpty, IsString } from "class-validator";

export class UserFindDto {
  @IsNotEmpty()
  @IsString()  
  username: string;
}
