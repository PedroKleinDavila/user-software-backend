import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const authToken = await this.authService.signIn(signInDto.email, signInDto.password);
    response.cookie('jwt', authToken.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 3600000),
    });
    return {
      "message": "success",
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      "message": "success",
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
