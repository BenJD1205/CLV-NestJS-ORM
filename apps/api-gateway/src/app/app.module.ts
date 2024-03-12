import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { EventGateway } from './event/event.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    AuthModule,
    UserModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EventGateway,
    {
      provide:'USER_MICROSERVICE',
        useFactory: (configService: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
              port: configService.get('USER_PORT'),
              host: configService.get('USER_HOST'),
            },
          })
        },
        inject: [ConfigService],
    }
  ],
})
export class AppModule {}
