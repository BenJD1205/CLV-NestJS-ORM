import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: this.configService.get('postgres.type', { infer: true }),
      url: this.configService.get('postgres.url', { infer: true }),
      port: this.configService.get('postgres.port', { infer: true }),
      username: this.configService.get('postgres.username', { infer: true }),
      password: this.configService.get('postgres.password', { infer: true }),
      database: this.configService.get('postgres.name', { infer: true }),
      dropSchema: false,
      synchronize: false,
      keepConnectionAlive: true,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
