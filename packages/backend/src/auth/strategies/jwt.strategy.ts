import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../auth-token.service';
import { UserSessionService } from '../user-session.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly sessionService: UserSessionService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
      passReqToCallback: true // Pass request to validate method
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is disabled');
    }

    // Extract token from Authorization header for session validation
    const authorization = req.headers?.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
      const accessToken = authorization.substring(7);

      try {
        // Validate that the session exists and is active
        const session = await this.sessionService.validateSession(accessToken);

        if (!session || !session.isActive) {
          throw new UnauthorizedException('Invalid session');
        }
      } catch {
        throw new UnauthorizedException('Invalid session');
      }
    }

    return user;
  }
}
