import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Bootstrap server
async function bootstrap() {

  // Init fasitfy
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, new FastifyAdapter(),
  );

  // Documentation
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('A Kako To? Api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  // Use validation pipe globally
  app.useGlobalPipes(new ValidationPipe());

  // Start server
  await app.listen(process.env.SERVER_PORT, '0.0.0.0');
}

// Start server
bootstrap();