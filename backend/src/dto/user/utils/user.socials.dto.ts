import { IsOptional, IsString, IsUrl } from "class-validator";

export class UserSocialsDto {
  @IsOptional()
  @IsUrl()
  instagram?: string;

  @IsOptional()
  @IsUrl()
  github?: string;

  @IsOptional()
  @IsString()
  steam?: string;

  @IsOptional()
  @IsString()
  discord?: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;
}
