import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
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
  ]
})
export class UserModule {}
