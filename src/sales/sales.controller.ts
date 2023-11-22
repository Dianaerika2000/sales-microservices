import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleDto } from './dto/create-sale-detail.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

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

  @Get('/volumen')
  async getVolumenVentas(
    @Query('dateStart') dateStart: Date,
    @Query('dateEnd') dateEnd: Date,
  ) {
    try {
      const volumenVentas = await this.salesService.getVolumenSales(dateStart, dateEnd);
      return {
        volumenVentas,
      };
    } catch (error) {
      return {
        error: 'Error al obtener el volumen de ventas',
        message: error.message,
      };
    }
  }

  @Get('/ingresos')
  async getRevenueSales(
    @Query('fechaInicio') fechaInicio: Date,
    @Query('fechaFin') fechaFin: Date,
  ) {
    try {
      const ingresosVentas = await this.salesService.getRevenueSales(fechaInicio, fechaFin);
      return {
        ingresosVentas,
      };
    } catch (error) {
      return {
        error: 'Error al obtener los ingresos de ventas',
        message: error.message,
      };
    }
  }
}
