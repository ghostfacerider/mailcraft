import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  // data transfer object validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // set helmet
  app.use(helmet());

  // set logger
  // app.useLogger(app.get(Logger));

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
