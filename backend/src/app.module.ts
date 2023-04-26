import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: 'info',
              options: {},
            },
            {
              target: 'pino/file',
              level: 'info',
              options: {
                destination: path.join(__dirname, '..', 'logs', 'app.log'),
              },
            },
          ],
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}