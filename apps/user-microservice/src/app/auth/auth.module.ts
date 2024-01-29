import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from '@nest-training/shared/guard';
import { LocalStrategy } from './passport/local-strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt-strategy';
import { UserModule } from '../user/user.module';
import {User} from '@nest-training/shared/entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [JwtGuard, JwtStrategy,LocalStrategy ,AuthService]
})
export class AuthModule {}
