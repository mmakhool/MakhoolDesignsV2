import { MikroORM } from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import mikroOrmConfig from '../mikro-orm.config';

async function hashExistingPasswords() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  try {
    // Find users with plain text passwords (not starting with $2b$ which indicates bcrypt hash)
    const users = await em.find(User, {});

    for (const user of users) {
      if (user.password && !user.password.startsWith('$2b$')) {
        console.log(`Updating password for user: ${user.email}`);

        // Hash the plain text password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        console.log(`✅ Password hashed for ${user.email}`);
      } else if (user.password?.startsWith('$2b$')) {
        console.log(`✓ Password already hashed for ${user.email}`);
      } else {
        console.log(`⚠️  No password set for ${user.email}`);
      }
    }

    await em.flush();
    console.log('\n🎉 All passwords have been updated!');

    // Show login credentials
    console.log('\n📋 Your login credentials:');
    for (const user of users) {
      if (user.email === 'mmakhool6@gmail.com') {
        console.log(`📧 Email: ${user.email}`);
        console.log(`🔑 Password: dbadmin`);
        console.log(`👤 Username: ${user.username}`);
      } else if (user.email === 'mmakhool6@yahoo.com') {
        console.log(`📧 Email: ${user.email}`);
        console.log(`🔑 Password: [whatever you used when registering]`);
        console.log(`👤 Username: ${user.username}`);
      }
    }
  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    await orm.close();
  }
}

// Run the script
hashExistingPasswords().catch(console.error);
