// Test file to verify imports work correctly
import { APP_NAME, CONTACT_EMAIL } from './constants';
import { formatDate, slugify } from './utils';
import { ContactFormSchema, ProjectCategory } from './types';

console.log('App Name:', APP_NAME);
console.log('Contact Email:', CONTACT_EMAIL);
console.log('Format Date:', formatDate(new Date()));
console.log('Slugify:', slugify('Test String'));
console.log('Project Category:', ProjectCategory.WEB_DEVELOPMENT);

// Test schema
const testData = {
  name: 'Test',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'Test Message'
};

try {
  const validated = ContactFormSchema.parse(testData);
  console.log('Schema validation passed:', validated);
} catch (error) {
  console.error('Schema validation failed:', error);
}
