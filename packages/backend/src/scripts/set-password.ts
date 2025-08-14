import { MikroORM } from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import mikroOrmConfig from '../mikro-orm.config';

async function setUserPassword() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  try {
    // Find your existing user
    const user = await em.findOne(User, { email: 'mmakhool6@gmail.com' });

    if (!user) {
      console.error('User not found!');
      await orm.close();
      return;
    }

    // Set a password
    const newPassword = 'makhool123'; // You can change this
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await em.flush();

    console.log('✅ Password set successfully!');
    console.log('📧 Email: mmakhool6@gmail.com');
    console.log('🔑 Password: makhool123');
    console.log('');
    console.log('You can now log in using these credentials.');
  } catch (error) {
    console.error('Error setting password:', error);
  } finally {
    await orm.close();
  }
}

// Run the script
setUserPassword().catch(console.error);
