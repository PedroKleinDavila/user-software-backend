import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./dto/createUserDto";
import { SignupUserDto } from "./dto/signupUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";
const prisma = new PrismaClient();
@Injectable()
export class UserService {


    //CRUD
    async create(data: CreateUserDto) {
        data.password = await this.hashPassword(data.password);
        return await prisma.user.create({
            data: {
                ...data,
            },
        });
    }
    async signup(data: SignupUserDto) {
        data.password = await this.hashPassword(data.password);
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
            select: {
                id: true,
                name: true,
                email: true,
                level: true,
                password: false,
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
        if (data.password) {
            data.password = await this.hashPassword(data.password);
        }
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



    //hashing password
    async hashPassword(password: string): Promise<string> {
        try {
            const hash = await bcrypt.hash(password, 10);
            return hash;
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    }
    async comparePassword(password: string, hash: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hash);
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    }
}