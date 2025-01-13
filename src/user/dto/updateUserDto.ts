import { IsEmail, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateUserDto {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsInt()
    @Min(1)
    @Max(3)
    level: number;
}