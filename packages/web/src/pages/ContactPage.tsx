import React from 'react';
import { ContactForm } from '../components/ContactForm';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
          <ContactForm
            onSuccess={() => {
              // Handle success - could show a success message or redirect
              console.log('Contact form submitted successfully!');
            }}
            onError={(error) => {
              // Handle error - could show an error toast
              console.error('Contact form error:', error);
            }}
          />
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">contact@makhooldesigns.com</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Address</h3>
              <p className="text-gray-600 dark:text-gray-300">
                123 Design Street<br />
                Creative City, CC 12345
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Business Hours</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
