import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RoleType } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { AuthTokenService, AuthTokens } from './auth-token.service';
import { UserSessionService } from './user-session.service';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: {
      id: string;
      name: RoleType;
      description?: string;
    };
  };
  tokens: AuthTokens;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly tokenService: AuthTokenService,
    private readonly sessionService: UserSessionService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    // Add timing attack protection
    const user = await this.usersService.findByEmail(email);
    const dummyHash = '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890';
    
    // Always perform bcrypt comparison to prevent timing attacks
    const passwordToCompare = user?.password || dummyHash;
    const isValidPassword = await bcrypt.compare(password, passwordToCompare);
    
    if (user && user.password && isValidPassword) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    // Update last login
    await this.usersService.update(user.id, { lastLoginAt: new Date() });

    // Generate tokens
    const tokens = this.tokenService.generateTokens(user);

    // Create session record in database
    const accessTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await this.sessionService.createSession({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || '',
      expiresAt: accessTokenExpiry
      // TODO: Add IP address and user agent from request context
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: {
          id: user.role.id,
          name: user.role.name,
          description: user.role.description
        }
      },
      tokens
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if user already exists
    const existingUserByEmail = await this.usersService.findByEmail(
      registerDto.email
    );
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUserByUsername = await this.usersService.findByUsername(
      registerDto.username
    );
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    // Get default role (user role)
    const defaultRole = await this.rolesService.findByName(RoleType.USER);
    if (!defaultRole) {
      throw new Error('Default user role not found');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // Create user
    const user = await this.usersService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
      roleId: defaultRole.id
    });

    const tokens = this.tokenService.generateTokens(user);

    // Create session record in database
    const accessTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await this.sessionService.createSession({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || '',
      expiresAt: accessTokenExpiry
      // TODO: Add IP address and user agent from request context
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: {
          id: user.role.id,
          name: user.role.name,
          description: user.role.description
        }
      },
      tokens
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      // Find and validate the session by refresh token
      const session =
        await this.sessionService.findByRefreshToken(refreshToken);

      if (!session || !session.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = session.user;
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const newTokens = this.tokenService.generateTokens(user);

      // Update the session with new tokens
      const accessTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      await this.sessionService.refreshSession(
        session.id,
        newTokens.accessToken,
        newTokens.refreshToken || '',
        accessTokenExpiry
      );

      return newTokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(accessToken: string): Promise<void> {
    try {
      const session = await this.sessionService.findByAccessToken(accessToken);
      if (session) {
        await this.sessionService.invalidateSession(session.id);
      }
    } catch {
      // Silently fail if session not found - user might be logging out with expired token
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
