import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { SalesDetailsModule } from 'src/sales-details/sales-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    CustomerModule,
    SalesDetailsModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
