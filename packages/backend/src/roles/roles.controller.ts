import { Controller, Get, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of roles' })
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active roles only' })
  @ApiResponse({ status: 200, description: 'List of active roles' })
  async getActiveRoles(): Promise<Role[]> {
    return this.rolesService.getActiveRoles();
  }
}
