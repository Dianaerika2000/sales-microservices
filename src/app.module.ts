import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      // url: configService.get('DB_URL'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: ['dist/src/**/*.entity{.ts,.js}'],
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
      cache: false,
      // ssl: true,
    }),
  }),
  CustomerModule,
  SalesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
