import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
