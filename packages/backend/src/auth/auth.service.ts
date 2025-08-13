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
    private readonly tokenService: AuthTokenService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
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

    const tokens = this.tokenService.generateTokens(user);

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
      const payload = this.tokenService.verifyToken(refreshToken, true);
      const user = await this.usersService.findById(payload.sub);

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.tokenService.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
