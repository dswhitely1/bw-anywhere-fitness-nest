import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {join} from 'path';
require('dotenv').config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Missing Environment Variable: env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(key => this.getValue(key, true));
    return this;
  }

  public getSecret(): string {
    return this.getValue('JWT_SECRET');
  }

  public getPort(): number {
    return Number(this.getValue('PORT'));
  }

  public isProduction(): boolean {
    return this.getValue('NODE_ENV') === 'production';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: Number(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASS'),
      database: this.getValue('DB_NAME'),

      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      migrationsTableName: 'migrations',

      migrations: ['src/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      ssl: this.isProduction(),
    };
  }
}

export const configService = new ConfigService(process.env).ensureValues([
  'JWT_SECRET',
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
]);
