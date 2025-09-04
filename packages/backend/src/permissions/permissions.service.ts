import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: EntityRepository<Permission>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }

  async findById(id: string): Promise<Permission | null> {
    return this.permissionRepository.findOne({ id });
  }

  async findByName(name: string): Promise<Permission | null> {
    return this.permissionRepository.findOne({ name });
  }

  async create(permissionData: {
    name: string;
    description?: string;
  }): Promise<Permission> {
    const permission = new Permission(permissionData.name, permissionData.description);
    await this.em.persistAndFlush(permission);
    return permission;
  }

  async update(id: string, permissionData: Partial<Permission>): Promise<Permission | null> {
    const permission = await this.permissionRepository.findOne({ id });
    if (!permission) {
      return null;
    }

    if (permissionData.name !== undefined) {
      permission.name = permissionData.name;
    }
    if (permissionData.description !== undefined) {
      permission.description = permissionData.description;
    }
    if (permissionData.isActive !== undefined) {
      permission.isActive = permissionData.isActive;
    }

    await this.em.persistAndFlush(permission);
    return permission;
  }

  async delete(id: string): Promise<boolean> {
    const permission = await this.permissionRepository.findOne({ id });
    if (!permission) {
      return false;
    }

    await this.em.removeAndFlush(permission);
    return true;
  }

  async getActivePermissions(): Promise<Permission[]> {
    return this.permissionRepository.find({ isActive: true });
  }

  async findByNames(names: string[]): Promise<Permission[]> {
    return this.permissionRepository.find({ name: { $in: names } });
  }
}