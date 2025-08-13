import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../entities/role.entity';
import { ROLES_KEY } from '../guards/roles.guard';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
