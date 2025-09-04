import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Response,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { User } from '../entities/user.entity';
import {
    AuthResponse,
    AuthService,
    LoginDto,
    RegisterDto
} from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface AuthenticatedRequest extends ExpressRequest {
  user: User;
}

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            username: { type: 'string' },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Response({ passthrough: true }) response: ExpressResponse
  ) {
    const authResponse: AuthResponse = await this.authService.login(loginDto);
    
    // Set JWT tokens as HTTP-only cookies
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Access token cookie (1 hour)
    response.cookie('accessToken', authResponse.tokens.accessToken, {
      httpOnly: true,
      secure: isProduction, // HTTPS only in production
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
      path: '/'
    });
    
    // Refresh token cookie (7 days)
    if (authResponse.tokens.refreshToken) {
      response.cookie('refreshToken', authResponse.tokens.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/'
      });
    }
    
    // Return only user data (no tokens in response body)
    return {
      user: authResponse.user,
      message: 'Login successful'
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'password123' }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Registration successful'
  })
  @ApiResponse({ status: 409, description: 'Email or username already exists' })
  async register(
    @Body() registerDto: RegisterDto,
    @Response({ passthrough: true }) response: ExpressResponse
  ) {
    const authResponse: AuthResponse = await this.authService.register(registerDto);
    
    // Set JWT tokens as HTTP-only cookies
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Access token cookie (1 hour)
    response.cookie('accessToken', authResponse.tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
      path: '/'
    });
    
    // Refresh token cookie (7 days)
    if (authResponse.tokens.refreshToken) {
      response.cookie('refreshToken', authResponse.tokens.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/'
      });
    }
    
    // Return only user data
    return {
      user: authResponse.user,
      message: 'Registration successful'
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(
    @Request() req: ExpressRequest,
    @Response({ passthrough: true }) response: ExpressResponse
  ) {
    // Get refresh token from HTTP-only cookie
    const refreshToken = (req.cookies as Record<string, string>)?.refreshToken;
    
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    
    const newTokens = await this.authService.refreshToken(refreshToken);
    
    // Set new tokens as HTTP-only cookies
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Access token cookie (1 hour)
    response.cookie('accessToken', newTokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
      path: '/'
    });
    
    // Refresh token cookie (7 days) - only if new refresh token provided
    if (newTokens.refreshToken) {
      response.cookie('refreshToken', newTokens.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/'
      });
    }
    
    return { message: 'Token refreshed successfully' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully'
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req: AuthenticatedRequest) {
    const user = req.user;
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: {
        id: user.role.id,
        name: user.role.name,
        description: user.role.description
      },
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user and invalidate session' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(
    @Request() req: AuthenticatedRequest,
    @Response({ passthrough: true }) response: ExpressResponse
  ) {
    // Extract token from cookies or Authorization header (for backward compatibility)
    const accessToken = 
      (req.cookies as Record<string, string>)?.accessToken || 
      (req.headers?.['authorization'] as string)?.substring(7);
    
    if (accessToken) {
      await this.authService.logout(accessToken);
    }

    // Clear HTTP-only cookies
    response.clearCookie('accessToken', { path: '/' });
    response.clearCookie('refreshToken', { path: '/' });

    return { message: 'Successfully logged out' };
  }
}
