import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Role, RoleType } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    private readonly em: EntityManager,
    private readonly permissionsService: PermissionsService
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleRepository.findOne({ id });
  }

  async findByName(name: RoleType): Promise<Role | null> {
    return this.roleRepository.findOne({ name });
  }

  async create(roleData: {
    name: string;
    description?: string;
    permissionNames?: string[];
  }): Promise<Role> {
    const role = new Role(roleData.name, roleData.description);
    
    if (roleData.permissionNames && roleData.permissionNames.length > 0) {
      const permissions = await this.permissionsService.findByNames(roleData.permissionNames);
      role.permissions.set(permissions);
    }
    
    await this.em.persistAndFlush(role);
    return role;
  }

  async update(id: string, roleData: Partial<Role> & { permissionNames?: string[] }): Promise<Role | null> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) {
      return null;
    }

    if (roleData.name !== undefined) {
      role.name = roleData.name;
    }
    if (roleData.description !== undefined) {
      role.description = roleData.description;
    }
    if (roleData.isActive !== undefined) {
      role.isActive = roleData.isActive;
    }
    
    if (roleData.permissionNames !== undefined) {
      if (roleData.permissionNames.length > 0) {
        const permissions = await this.permissionsService.findByNames(roleData.permissionNames);
        role.permissions.set(permissions);
      } else {
        role.permissions.removeAll();
      }
    }

    await this.em.persistAndFlush(role);
    return role;
  }

  async delete(id: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) {
      return false;
    }

    await this.em.removeAndFlush(role);
    return true;
  }

  async getActiveRoles(): Promise<Role[]> {
    return this.roleRepository.find({ isActive: true });
  }
}
