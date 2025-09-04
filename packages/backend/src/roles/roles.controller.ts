import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    UseGuards, 
    HttpStatus,
    NotFoundException,
    ConflictException,
    ValidationPipe
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiParam,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

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

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ name: 'id', description: 'Role ID', type: String })
  @ApiResponse({ status: 200, description: 'Role found', type: Role })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async getRoleById(@Param('id') id: string): Promise<Role> {
    const role = await this.rolesService.findById(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully', type: Role })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({ description: 'Role with this name already exists' })
  async createRole(@Body(ValidationPipe) createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      return await this.rolesService.create(createRoleDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        throw new ConflictException('Role with this name already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role by ID' })
  @ApiParam({ name: 'id', description: 'Role ID', type: String })
  @ApiResponse({ status: 200, description: 'Role updated successfully', type: Role })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({ description: 'Role with this name already exists' })
  async updateRole(
    @Param('id') id: string,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto
  ): Promise<Role> {
    try {
      const updatedRole = await this.rolesService.update(id, updateRoleDto);
      if (!updatedRole) {
        throw new NotFoundException('Role not found');
      }
      return updatedRole;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        throw new ConflictException('Role with this name already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role by ID' })
  @ApiParam({ name: 'id', description: 'Role ID', type: String })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async deleteRole(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.rolesService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Role not found');
    }
    return { message: 'Role deleted successfully' };
  }
}
