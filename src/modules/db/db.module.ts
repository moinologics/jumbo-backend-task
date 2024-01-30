import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Entites from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        schema: configService.get('DATABASE_SCHEMA') || 'public',
        entities: Object.values(Entites),
        logging: configService.get('NODE_ENV') === 'development',
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
