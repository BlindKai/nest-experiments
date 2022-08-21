import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('User & Posts API Reference')
  .setDescription('This is the general API documentation')
  .setVersion('0.1')
  .addTag('Users', 'Application users')
  .addTag('Posts', 'Posts written by users')
  .build();
