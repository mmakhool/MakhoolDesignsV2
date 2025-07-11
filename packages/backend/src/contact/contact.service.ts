import { Injectable } from '@nestjs/common';
import { ContactFormData } from '@makhool-designs/shared';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async submitContact(contactData: ContactFormData) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'info@makhooldesigns.com',
        subject: `Contact Form: ${contactData.subject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message}</p>
        `
      });

      return {
        success: true,
        message: 'Contact form submitted successfully'
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      };
    }
  }
}
