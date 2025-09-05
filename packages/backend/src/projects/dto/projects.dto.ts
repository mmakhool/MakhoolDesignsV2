import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProjectCategory } from '../../entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({ description: 'Title of the project', maxLength: 255 })
  @IsString()
  @MinLength(1, { message: 'Title is required' })
  @MaxLength(255, { message: 'Title must be less than 255 characters' })
  title: string;

  @ApiProperty({ description: 'Description of the project' })
  @IsString()
  @MinLength(1, { message: 'Description is required' })
  description: string;

  @ApiPropertyOptional({ description: 'Main image URL for the project' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid image URL' })
  imageUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Array of tags associated with the project',
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ 
    description: 'Array of additional image URLs for the project',
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true, message: 'Invalid image URL' })
  images?: string[];

  @ApiProperty({ 
    description: 'Category of the project',
    enum: ProjectCategory,
    example: ProjectCategory.WEB_DEVELOPMENT
  })
  @IsEnum(ProjectCategory)
  category: ProjectCategory;

  @ApiPropertyOptional({ description: 'Whether the project is featured', default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Whether the project is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'URL to the live project' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid project URL' })
  projectUrl?: string;

  @ApiPropertyOptional({ description: 'URL to the GitHub repository' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid GitHub URL' })
  githubUrl?: string;

  @ApiPropertyOptional({ description: 'Technologies used in the project' })
  @IsOptional()
  @IsString()
  technologies?: string;

  @ApiPropertyOptional({ description: 'Date when the project was completed' })
  @IsOptional()
  @IsDateString()
  completedAt?: string;
}

export class UpdateProjectDto {
  @ApiPropertyOptional({ description: 'Title of the project', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Title is required' })
  @MaxLength(255, { message: 'Title must be less than 255 characters' })
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the project' })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Description is required' })
  description?: string;

  @ApiPropertyOptional({ description: 'Main image URL for the project' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid image URL' })
  imageUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Array of tags associated with the project',
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ 
    description: 'Array of additional image URLs for the project',
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true, message: 'Invalid image URL' })
  images?: string[];

  @ApiPropertyOptional({ 
    description: 'Category of the project',
    enum: ProjectCategory
  })
  @IsOptional()
  @IsEnum(ProjectCategory)
  category?: ProjectCategory;

  @ApiPropertyOptional({ description: 'Whether the project is featured' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Whether the project is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'URL to the live project' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid project URL' })
  projectUrl?: string;

  @ApiPropertyOptional({ description: 'URL to the GitHub repository' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid GitHub URL' })
  githubUrl?: string;

  @ApiPropertyOptional({ description: 'Technologies used in the project' })
  @IsOptional()
  @IsString()
  technologies?: string;

  @ApiPropertyOptional({ description: 'Date when the project was completed' })
  @IsOptional()
  @IsDateString()
  completedAt?: string;
}