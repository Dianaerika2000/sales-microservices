import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    private customerService: CustomerService,
  ) {}

  async createSale(createSaleDto: CreateSaleDto) {
    const { customerId, ...saleData } = createSaleDto;

    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const sale = this.saleRepository.create({
      ...saleData,
      customer,
    });

    return await this.saleRepository.save(sale);
  }

  async getAllSales(): Promise<Sale[]> {
    return await this.saleRepository.find();
  }

  async getSaleById(id: number) {
    const sale = await this.saleRepository.findOneBy({ id });

    if (!sale) {
      throw new Error(`Sale with ID ${id} not found`);
    }

    return sale;
  }

  async updateSale(id: number, updateSaleDto: UpdateSaleDto) {
    await this.getSaleById(id);

    const { customerId, ...saleData } = updateSaleDto;

    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const sale = this.saleRepository.update( id, {
      ...saleData,
      customer,
    });

    return this.getSaleById(id);
  }

  async deleteSale(id: number) {
    const sale = await this.getSaleById(id); 
    await this.saleRepository.remove(sale);
  }
}
