import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.name
    };

    return this.jwtService.sign(payload, {
      expiresIn: '1h' // Access token expires in 1 hour
    });
  }

  generateRefreshToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.name
    };

    return this.jwtService.sign(payload, {
      expiresIn: '7d', // Refresh token expires in 7 days
      secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    });
  }

  generateTokens(user: User): AuthTokens {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user)
    };
  }

  verifyToken(token: string, isRefreshToken: boolean = false): JwtPayload {
    const secret = isRefreshToken
      ? process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
      : undefined;

    return this.jwtService.verify(token, { secret });
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = this.jwtService.decode(token);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded as JwtPayload;
      }
      return null;
    } catch {
      return null;
    }
  }
}
