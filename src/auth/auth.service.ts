import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await this.userService.comparePassword(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, level: user.level };
    const token = await this.jwtService.signAsync(payload);

    return { accessToken: token };
  }
}
