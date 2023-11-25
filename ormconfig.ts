import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

module.exports = {
  type: 'postgres',
  //host: 'localhost',
  //port: 5432,
  //username: 'postgres',
  //password : 'postgres',
  //database: 'db_sales',
  url: configService.get('DB_URL'),
  ssl: true,
  entities: ['src/**/**/*.entity{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
}
