import { Controller, Get, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Permission } from '../entities/permission.entity';
import { PermissionsService } from './permissions.service';

@ApiTags('permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'List of permissions' })
  async getAllPermissions(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active permissions only' })
  @ApiResponse({ status: 200, description: 'List of active permissions' })
  async getActivePermissions(): Promise<Permission[]> {
    return this.permissionsService.getActivePermissions();
  }
}