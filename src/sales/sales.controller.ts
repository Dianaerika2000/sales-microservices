import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleDto } from './dto/create-sale-detail.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }

  @Post('/register')
  createSaleWithDetail(@Body() createSaleDto: SaleDto) {
    return this.salesService.createSaleWithDetail(createSaleDto);
  }
  
  @Get()
  findAll() {
    return this.salesService.getAllSales();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.salesService.getSaleById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.updateSale(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.salesService.deleteSale(id);
  }
}
