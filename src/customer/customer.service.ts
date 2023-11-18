import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({
      id: id,
      ...updateCustomerDto,
     });
    
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }

    return await this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    return await this.customerRepository.delete(customer);
  }
}
