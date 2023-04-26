import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.use(helmet());
  app.useLogger(app.get(Logger));
  await app.listen(port);
}
bootstrap();
