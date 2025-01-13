import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signupUserDto';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { VerifyCodeDto } from './dto/verifyCodeDto';
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
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @Get()
    async findAll() {
        return this.userService.findAll();
    }
    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }
    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }
    @Put('id/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }


    //Verification
    @Get('login')
  async login(@Query('email') email: string, @Query('password') password: string) {
    const data = { email, password };
    return this.userService.verifyLogin(data); 
  }
    @Put('code')
    async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
        return this.userService.verifyCode(verifyCodeDto);
    }
    @Put('sendEmail/:email')
    async sendEmail(@Param('email') email: string) {
        return this.userService.sendEmail(email);
    }
}