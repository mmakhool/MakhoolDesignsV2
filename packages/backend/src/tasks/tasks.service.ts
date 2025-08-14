import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserSessionService } from '../auth/user-session.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly sessionService: UserSessionService) {}

  /**
   * Clean up expired user sessions from the database
   * Runs every hour at the top of the hour (0 minutes)
   */
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredSessions(): Promise<void> {
    try {
      this.logger.log('Starting scheduled expired sessions cleanup...');
      const deletedCount = await this.sessionService.cleanupExpiredSessions();
      this.logger.log(
        `Scheduled cleanup completed. Removed ${deletedCount} expired sessions`
      );
    } catch (error) {
      this.logger.error('Error during scheduled session cleanup:', error);
    }
  }

  /**
   * Clean up expired sessions every 30 minutes for more frequent cleanup
   * Useful during high activity periods
   */
  @Cron('0,30 * * * *')
  async frequentSessionCleanup(): Promise<void> {
    try {
      this.logger.debug(
        'Starting frequent session cleanup (30min interval)...'
      );
      const deletedCount = await this.sessionService.cleanupExpiredSessions();
      if (deletedCount > 0) {
        this.logger.log(
          `Frequent cleanup completed. Removed ${deletedCount} expired sessions`
        );
      }
    } catch (error) {
      this.logger.error('Error during frequent session cleanup:', error);
    }
  }

  /**
   * Manually trigger session cleanup (for API endpoints)
   */
  async triggerCleanup(): Promise<{ deletedCount: number; timestamp: Date }> {
    try {
      this.logger.log('Starting manual session cleanup...');
      const deletedCount = await this.sessionService.cleanupExpiredSessions();
      this.logger.log(
        `Manual cleanup completed. Removed ${deletedCount} expired sessions`
      );
      return {
        deletedCount,
        timestamp: new Date()
      };
    } catch (error) {
      this.logger.error('Error during manual session cleanup:', error);
      throw error;
    }
  }

  /**
   * Get cleanup task status
   */
  getStatus(): {
    isRunning: boolean;
    hourlyCleanup: string;
    frequentCleanup: string;
  } {
    return {
      isRunning: true, // Cron jobs are always running when app is running
      hourlyCleanup: 'Every hour at 0 minutes (0 * * * *)',
      frequentCleanup: 'Every 30 minutes (0,30 * * * *)'
    };
  }
}
