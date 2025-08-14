import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserSession } from '../entities/user-session.entity';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { AuthTokenService } from './auth-token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSessionService } from './user-session.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MikroOrmModule.forFeature([UserSession]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' }
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    RolesModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthTokenService,
    UserSessionService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService, AuthTokenService, UserSessionService]
})
export class AuthModule {}
