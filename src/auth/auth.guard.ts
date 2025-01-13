import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies.jwt;
        if (!token) {
            throw new UnauthorizedException({
                message: 'Token not provided',
            });
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });

            request.user = payload;

            const requiredRoles = this.getRequiredRoles(context);
            if (requiredRoles && !requiredRoles.includes(payload.role)) {
                throw new UnauthorizedException({
                    message: 'You do not have permission to access this route',
                });
            }
        } catch (err) {
            console.error('JWT verification failed:', err.message);

            throw new UnauthorizedException({
                message: 'Invalid or expired token',
            });
        }

        return true;
    }

    private getRequiredRoles(context: ExecutionContext): string[] {
        const handler = context.getHandler();
        return Reflect.getMetadata('roles', handler); 
    }
}
