import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {postgresConfig} from '@nest-training/shared/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'],load:[postgresConfig] }),
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeormConfigService,
    //   dataSourceFactory: async (options: DataSourceOptions) => {
    //     return new DataSource(options).initialize();
    //   },
    // }), 
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_DATABASE_HOST'),
        port: configService.getOrThrow('POSTGRES_DATABASE_PORT'),
        database: configService.getOrThrow('POSTGRES_DATABASE_NAME'),
        username: configService.getOrThrow('POSTGRES_DATABASE_USERNAME'),
        password: configService.getOrThrow('POSTGRES_DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
