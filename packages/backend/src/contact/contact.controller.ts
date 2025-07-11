import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactFormData } from '@makhool-designs/shared';
import { ContactService } from './contact.service';

@ApiTags('contact')
@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact form' })
  @ApiResponse({
    status: 201,
    description: 'Contact form submitted successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid form data' })
  async submitContact(@Body() contactData: ContactFormData) {
    return await this.contactService.submitContact(contactData);
  }
}
