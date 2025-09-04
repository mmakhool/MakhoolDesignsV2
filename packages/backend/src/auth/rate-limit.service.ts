import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface RateLimitEntry {
  attempts: number;
  resetTime: number;
  blockedUntil?: number;
}

@Injectable()
export class RateLimitService {
  private readonly attempts = new Map<string, RateLimitEntry>();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  private readonly blockDurationMs: number;

  constructor(private readonly configService: ConfigService) {
    this.maxAttempts = this.configService.get<number>('AUTH_MAX_ATTEMPTS') || 5;
    this.windowMs = this.configService.get<number>('AUTH_WINDOW_MS') || 15 * 60 * 1000; // 15 minutes
    this.blockDurationMs = this.configService.get<number>('AUTH_BLOCK_DURATION_MS') || 30 * 60 * 1000; // 30 minutes
  }

  /**
   * Check if the identifier (email/IP) is rate limited
   */
  isRateLimited(identifier: string): { limited: boolean; resetTime?: number } {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry) {
      return { limited: false };
    }

    // Check if blocked period is still active
    if (entry.blockedUntil && entry.blockedUntil > now) {
      return { limited: true, resetTime: entry.blockedUntil };
    }

    // Reset if window has expired
    if (entry.resetTime <= now) {
      this.attempts.delete(identifier);
      return { limited: false };
    }

    // Check if max attempts exceeded
    if (entry.attempts >= this.maxAttempts) {
      entry.blockedUntil = now + this.blockDurationMs;
      return { limited: true, resetTime: entry.blockedUntil };
    }

    return { limited: false, resetTime: entry.resetTime };
  }

  /**
   * Record a failed login attempt
   */
  recordFailedAttempt(identifier: string): void {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry || entry.resetTime <= now) {
      // Create new entry or reset expired entry
      this.attempts.set(identifier, {
        attempts: 1,
        resetTime: now + this.windowMs,
      });
    } else {
      // Increment existing entry
      entry.attempts += 1;
      if (entry.attempts >= this.maxAttempts) {
        entry.blockedUntil = now + this.blockDurationMs;
      }
    }
  }

  /**
   * Clear attempts for successful login
   */
  clearAttempts(identifier: string): void {
    this.attempts.delete(identifier);
  }

  /**
   * Get current attempt count for identifier
   */
  getAttemptCount(identifier: string): number {
    const entry = this.attempts.get(identifier);
    if (!entry || entry.resetTime <= Date.now()) {
      return 0;
    }
    return entry.attempts;
  }

  /**
   * Clean up expired entries (should be called periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [identifier, entry] of this.attempts.entries()) {
      if (entry.resetTime <= now && (!entry.blockedUntil || entry.blockedUntil <= now)) {
        this.attempts.delete(identifier);
      }
    }
  }
}