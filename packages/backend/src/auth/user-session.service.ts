import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserSession } from '../entities/user-session.entity';
import { User } from '../entities/user.entity';

export interface CreateSessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
}

@Injectable()
export class UserSessionService {
  constructor(
    @InjectRepository(UserSession)
    private readonly sessionRepository: EntityRepository<UserSession>,
    private readonly em: EntityManager
  ) {}

  /**
   * Create a new user session
   */
  async createSession(data: CreateSessionData): Promise<UserSession> {
    // Deactivate existing sessions for the user (optional: limit concurrent sessions)
    await this.deactivateUserSessions(data.user.id);

    const session = new UserSession(
      data.user,
      data.accessToken,
      data.expiresAt
    );
    session.refreshToken = data.refreshToken;
    session.ipAddress = data.ipAddress;
    session.userAgent = data.userAgent;

    await this.em.persistAndFlush(session);
    return session;
  }

  /**
   * Find an active session by access token
   */
  async findByAccessToken(accessToken: string): Promise<UserSession | null> {
    return this.sessionRepository.findOne(
      {
        accessToken,
        isActive: true,
        expiresAt: { $gt: new Date() }
      },
      {
        populate: ['user', 'user.role']
      }
    );
  }

  /**
   * Find an active session by refresh token
   */
  async findByRefreshToken(refreshToken: string): Promise<UserSession | null> {
    return this.sessionRepository.findOne(
      {
        refreshToken,
        isActive: true,
        expiresAt: { $gt: new Date() }
      },
      {
        populate: ['user', 'user.role']
      }
    );
  }

  /**
   * Update session activity timestamp
   */
  async updateActivity(sessionId: string): Promise<void> {
    const session = await this.sessionRepository.findOne(sessionId);
    if (session && session.isActive) {
      session.lastActivityAt = new Date();
      await this.em.flush();
    }
  }

  /**
   * Refresh a session with new tokens
   */
  async refreshSession(
    refreshToken: string,
    newAccessToken: string,
    newRefreshToken: string,
    newExpiresAt: Date
  ): Promise<UserSession> {
    const session = await this.findByRefreshToken(refreshToken);
    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    session.accessToken = newAccessToken;
    session.refreshToken = newRefreshToken;
    session.expiresAt = newExpiresAt;
    session.lastActivityAt = new Date();

    await this.em.flush();
    return session;
  }

  /**
   * Invalidate a specific session
   */
  async invalidateSession(accessToken: string): Promise<void> {
    const session = await this.sessionRepository.findOne({ accessToken });
    if (session) {
      session.isActive = false;
      await this.em.flush();
    }
  }

  /**
   * Invalidate all sessions for a user
   */
  async invalidateUserSessions(userId: string): Promise<void> {
    await this.sessionRepository.nativeUpdate(
      { user: userId, isActive: true },
      { isActive: false }
    );
  }

  /**
   * Deactivate existing active sessions for a user (for single session mode)
   */
  async deactivateUserSessions(userId: string): Promise<void> {
    await this.sessionRepository.nativeUpdate(
      { user: userId, isActive: true },
      { isActive: false }
    );
  }

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId: string): Promise<UserSession[]> {
    return this.sessionRepository.find(
      {
        user: userId,
        isActive: true,
        expiresAt: { $gt: new Date() }
      },
      {
        orderBy: { lastActivityAt: 'DESC' }
      }
    );
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions(): Promise<number> {
    const expiredSessions = await this.sessionRepository.find({
      $or: [{ expiresAt: { $lt: new Date() } }, { isActive: false }]
    });

    if (expiredSessions.length > 0) {
      await this.em.removeAndFlush(expiredSessions);
    }

    return expiredSessions.length;
  }

  /**
   * Get session statistics
   */
  async getSessionStats() {
    const totalSessions = await this.sessionRepository.count({});
    const activeSessions = await this.sessionRepository.count({
      isActive: true,
      expiresAt: { $gt: new Date() }
    });
    const expiredSessions = await this.sessionRepository.count({
      expiresAt: { $lt: new Date() }
    });

    return {
      total: totalSessions,
      active: activeSessions,
      expired: expiredSessions
    };
  }

  /**
   * Generate a secure session token
   */
  generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Validate session and check if it's still active and not expired
   */
  async validateSession(accessToken: string): Promise<UserSession> {
    const session = await this.findByAccessToken(accessToken);

    if (!session) {
      throw new UnauthorizedException('Invalid session');
    }

    if (!session.isActive) {
      throw new UnauthorizedException('Session is inactive');
    }

    if (session.expiresAt < new Date()) {
      // Mark session as inactive
      session.isActive = false;
      await this.em.flush();
      throw new UnauthorizedException('Session expired');
    }

    // Update last activity
    session.lastActivityAt = new Date();
    await this.em.flush();

    return session;
  }
}
