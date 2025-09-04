import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from '../entities/user.entity';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: string;
  type?: 'access' | 'refresh';
  sessionId?: string;
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
      role: user.role.name,
      iat: Math.floor(Date.now() / 1000),
      // Add session identifier for better tracking
      sessionId: crypto.randomBytes(16).toString('hex')
    };

    return this.jwtService.sign(payload, {
      expiresIn: '15m' // Shorter access token expiration for better security
    });
  }

  generateRefreshToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000)
    };

    // Ensure refresh secret is different from access token secret
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!refreshSecret || refreshSecret === process.env.JWT_SECRET) {
      throw new Error('JWT_REFRESH_SECRET must be set and different from JWT_SECRET');
    }

    return this.jwtService.sign(payload, {
      expiresIn: '7d', // Refresh token expires in 7 days
      secret: refreshSecret
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
