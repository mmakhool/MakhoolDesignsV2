import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll({
      populate: ['role']
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne(
      { id },
      {
        populate: ['role']
      }
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne(
      { email },
      {
        populate: ['role']
      }
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne(
      { username },
      {
        populate: ['role']
      }
    );
  }

  async create(userData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password?: string;
    roleId: string;
  }): Promise<User> {
    const role = await this.roleRepository.findOne({ id: userData.roleId });
    if (!role) {
      throw new Error('Role not found');
    }

    const user = new User(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.username,
      role
    );

    if (userData.password) {
      user.password = userData.password;
    }

    await this.em.persistAndFlush(user);
    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      return null;
    }

    if (userData.firstName !== undefined) {
      user.firstName = userData.firstName;
    }
    if (userData.lastName !== undefined) {
      user.lastName = userData.lastName;
    }
    if (userData.email !== undefined) {
      user.email = userData.email;
    }
    if (userData.username !== undefined) {
      user.username = userData.username;
    }
    if (userData.password !== undefined) {
      user.password = userData.password;
    }
    if (userData.isActive !== undefined) {
      user.isActive = userData.isActive;
    }

    await this.em.persistAndFlush(user);
    return user;
  }

  async updateRole(userId: string, roleId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      return null;
    }

    const role = await this.roleRepository.findOne({ id: roleId });
    if (!role) {
      throw new Error('Role not found');
    }

    user.role = role;
    await this.em.persistAndFlush(user);
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      return false;
    }

    await this.em.removeAndFlush(user);
    return true;
  }

  async getActiveUsers(): Promise<User[]> {
    return this.userRepository.find(
      { isActive: true },
      {
        populate: ['role']
      }
    );
  }

  async getUsersByRole(roleId: string): Promise<User[]> {
    return this.userRepository.find(
      { role: roleId },
      {
        populate: ['role']
      }
    );
  }
}
