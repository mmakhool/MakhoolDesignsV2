import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../auth-token.service';
import { UserSessionService } from '../user-session.service';

// Custom JWT extractor that looks in cookies first, then Authorization header
const jwtExtractor = (req: Request): string | null => {
  // First try to get token from HTTP-only cookie
  if (req && req.cookies) {
    const token = (req.cookies as Record<string, string>).accessToken;
    if (token) return token;
  }
  
  // Fallback to Authorization header for backward compatibility
  if (req.headers?.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
  }
  
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly sessionService: UserSessionService
  ) {
    super({
      jwtFromRequest: jwtExtractor, // Use our custom extractor
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

    // Extract token from Authorization header for activity tracking
    const authorization = req.headers?.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
      const accessToken = authorization.substring(7);

      try {
        // Find session and update activity without throwing if not found
        // This allows for graceful degradation if session tracking fails
        const session = await this.sessionService.findByAccessToken(accessToken);
        if (session && session.isActive) {
          await this.sessionService.updateActivity(session.id);
        }
      } catch {
        // Log the error but don't fail authentication
        // Session tracking is secondary to JWT validation
        console.warn('Session tracking failed for token validation');
      }
    }

    return user;
  }
}
