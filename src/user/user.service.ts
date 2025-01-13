import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./dto/createUserDto";
import { SignupUserDto } from "./dto/signupUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";
import { LoginUserDto } from "./dto/loginDto";
import { VerifyCodeDto } from "./dto/verifyCodeDto";
const prisma = new PrismaClient();
@Injectable()
export class UserService {


    //CRUD
    async create(data: CreateUserDto) {
        return await prisma.user.create({
            data: {
                ...data,
            },
        });
    }
    async signup(data: SignupUserDto) {
        return await prisma.user.create({
            data: {
                ...data,
            },
        });
    }
    async findAll() {
        return await prisma.user.findMany();
    }
    async findOne(id: string) {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async update(id: string, data: UpdateUserDto) {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }
    async remove(id: string) {
        return await prisma.user.delete({
            where: {
                id,
            },
        });
    }


    //Verification
    async verifyLogin(data: LoginUserDto) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
                password: data.password,
            },
        });
        if (user) {
            return user;
        }
        return { message: "Invalid email or password" };
    }
    async verifyCode(data: VerifyCodeDto) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
                code: data.code,
            },
        });
        if (user) {
            return await prisma.user.update({
                where: {
                    email: data.email,
                },
                data: {
                    code: -1,
                    isValid: true,
                },
            });
        }
        return { message: "Invalid code" };
    }
    async sendEmail(email: string) {
        const user = await this.findByEmail(email);
        if (user) {
            //Send email logic
            await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    code: Math.floor(Math.random() * 10000),
                    isValid: false,
                },
            });
            return { message: "Email sent" };
        } else { return { message: "Email not found" } }
    }
}