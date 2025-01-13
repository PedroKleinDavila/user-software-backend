import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signupUserDto';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }
    //CRUD
    @Post('signup')
    async signup(@Body() signupUserDto: SignupUserDto) {
        return this.userService.signup(signupUserDto);
    }
    @UseGuards(AuthGuard)
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return this.userService.findAll();
    }
    @UseGuards(AuthGuard)
    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }
    @UseGuards(AuthGuard)
    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }
    @UseGuards(AuthGuard)
    @Put('id/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}