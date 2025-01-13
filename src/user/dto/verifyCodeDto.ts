import { IsEmail, IsInt, IsString, Max, Min } from "class-validator";

export class VerifyCodeDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsInt()
    @Min(0)
    @Max(9999)
    code: number;
}