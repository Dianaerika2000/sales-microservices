import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleDto } from './dto/create-sale-detail.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger/dist';
import { join } from 'path';

@ApiTags('Sales')
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

  @Post('/volumen')
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

  @Post('/masvendidos')
  async obtenerProductosMasVendidosConDetalle(): Promise<any[]> {
    return this.salesService.obtenerProductosMasVendidosConDetalle();
  }

  @Post('/ingresosyears')
  async getNewsletterRevenueOverTime(@Query('year') startYear: number): Promise<any[]> {
    const results = await this.salesService.getNewsletterRevenueOverTime(startYear);

    return results;
  }

  @Post('/ultimasventas')
  async getUltimasVentas(): Promise<any[]> {
    const results = await this.salesService.getUltimasVentas();

    return results;
  }

  @Post('/totalSales')
  async getTotalIncome() {
    const results = await this.salesService.getTotalIncome();

    return results;
  }

  // @Get('related/:code')
  // async getRelatedProducts(@Param('code') code: string): Promise<any> {
  //   const csvFilePath = path.resolve('./src', '..', 'data-related.csv');
  //   const products = await this.salesService.getProductsFromCSV(csvFilePath);
    
  //   const relatedProducts = products.filter(product => product.code === code);

  //   return { relatedProducts };
  // }

  @Get('related/:code')
  async getRelatedProducts2(@Param('code') code: string): Promise<any> {
    const csvFilePath = join(__dirname, '..', '..', 'dataset_con_relaciones.csv');
    
    try {
      const products = await this.salesService.getProductsFromCSV(csvFilePath);
      
      const relatedProducts = products.filter(product => product.code === code);
      console.log(relatedProducts)
      
      return { relatedProducts };

    } catch (error) {
      console.log('Error: ', error.message);
    }
  }
}
