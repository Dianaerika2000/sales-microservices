import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SalesModule } from './sales/sales.module';
import { SalesDetailsModule } from './sales-details/sales-details.module';
import { RolModule } from './rol/rol.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
      // host: configService.get('DB_HOST'),
      // port: configService.get('DB_PORT'),
      // username: configService.get('DB_USERNAME'),
      // password: configService.get('DB_PASSWORD'),
      // database: configService.get('DB_DATABASE'),
      url: configService.get('DB_URL'),
      entities: ['dist/src/**/*.entity{.ts,.js}'],
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
      cache: false,
      ssl: true,
    }),
  }),
  CustomerModule,
  SalesModule,
  SalesDetailsModule,
  RolModule,
  UserModule,
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
