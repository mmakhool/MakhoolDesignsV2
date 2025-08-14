import { MikroORM } from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';
import { Role, RoleType } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import mikroOrmConfig from '../mikro-orm.config';

async function createAdmin() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  try {
    // First, create the roles if they don't exist
    const roles = Object.values(RoleType);

    for (const roleName of roles) {
      const existingRole = await em.findOne(Role, { name: roleName });
      if (!existingRole) {
        const role = new Role(roleName, `${roleName} role`);
        em.persist(role);
        console.log(`Created role: ${roleName}`);
      }
    }

    await em.flush();

    // Check if admin user already exists
    const existingAdmin = await em.findOne(User, {
      email: 'admin@makhool.com'
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@makhool.com');
      console.log('You can reset the password if needed.');
      await orm.close();
      return;
    }

    // Get the admin role
    const adminRole = await em.findOne(Role, { name: RoleType.SYSADMIN });

    if (!adminRole) {
      console.error('Admin role not found!');
      await orm.close();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User(
      'Admin',
      'User',
      'admin@makhool.com',
      'admin',
      adminRole
    );
    adminUser.password = hashedPassword;
    adminUser.isActive = true;

    em.persist(adminUser);
    await em.flush();

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@makhool.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Username: admin');
    console.log('');
    console.log('You can now log in using these credentials.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await orm.close();
  }
}

// Run the script
createAdmin().catch(console.error);
