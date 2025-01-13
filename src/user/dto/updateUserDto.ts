import { IsEmail, IsInt, IsString, Max, Min } from "class-validator";

export class UpdateUserDto {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    @Min(1)
    @Max(3)
    level: number;
}