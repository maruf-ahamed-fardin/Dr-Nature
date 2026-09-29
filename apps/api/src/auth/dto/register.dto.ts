import { IsEmail, IsOptional, IsString, Length, Matches } from "class-validator";
export class RegisterDto {
  @IsEmail() email!: string;
  @IsString() @Length(8, 128) password!: string;
  @IsString() @Length(2, 120) name!: string;
  @IsOptional() @IsString() @Matches(/^[0-9+()\-\s]{7,25}$/) phone?: string;
}
