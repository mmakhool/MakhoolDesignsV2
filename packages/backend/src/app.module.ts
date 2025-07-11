import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ContactModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
