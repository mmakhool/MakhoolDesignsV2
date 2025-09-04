import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RateLimitService } from '../rate-limit.service';

@Injectable()
export class RateLimitAuthGuard implements CanActivate {
  constructor(private readonly rateLimitService: RateLimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const identifier = this.getIdentifier(request);

    const { limited, resetTime } = this.rateLimitService.isRateLimited(identifier);
    
    if (limited) {
      const resetTimeSeconds = Math.ceil((resetTime! - Date.now()) / 1000);
      throw new HttpException(
        `Too many login attempts. Please try again in ${resetTimeSeconds} seconds.`,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    return true;
  }

  private getIdentifier(request: Request): string {
    // Use email from request body if available, otherwise fall back to IP
    const body = request.body as { email?: string };
    const email = body?.email;
    const ip = request.ip || request.connection.remoteAddress || 'unknown';
    
    // Prefer email-based rate limiting for better user experience
    return email ? `email:${email}` : `ip:${ip}`;
  }
}