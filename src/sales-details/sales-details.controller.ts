import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesDetailsService } from './sales-details.service';
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
import { UpdateSalesDetailDto } from './dto/update-sales-detail.dto';

@Controller('sales-details')
export class SalesDetailsController {
  constructor(private readonly salesDetailsService: SalesDetailsService) {}

  @Post()
  create(@Body() createSalesDetailDto: CreateSalesDetailDto) {
    return this.salesDetailsService.create(createSalesDetailDto);
  }

  @Get()
  findAll() {
    return this.salesDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesDetailDto: UpdateSalesDetailDto) {
    return this.salesDetailsService.update(+id, updateSalesDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesDetailsService.remove(+id);
  }
}
