import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
