import { IsEmail, IsString } from "class-validator";

export class SignupUserDto {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}