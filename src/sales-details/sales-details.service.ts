import { Injectable } from '@nestjs/common';
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
import { UpdateSalesDetailDto } from './dto/update-sales-detail.dto';
import { Repository } from 'typeorm';
import { SalesDetail } from './entities/sales-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalesDetailsService {
  constructor(
    @InjectRepository(SalesDetail)
    private salesDetailRepository: Repository<SalesDetail>,
  ) {}

  async create(createSalesDetailDto: CreateSalesDetailDto) {
    const salesDetail = this.salesDetailRepository.create(
      createSalesDetailDto,
    );

    return await this.salesDetailRepository.save(salesDetail);
  }

  async findAll() {
    return await this.salesDetailRepository.find();
  }

  async findOne(id: number) {
    const salesDetail = await this.salesDetailRepository.findOneBy({ id });
    if (!salesDetail) {
      throw new Error(`SalesDetail with ID ${id} not found`);
    }

    return salesDetail;
  }

  async update(id: number, updateSalesDetailDto: UpdateSalesDetailDto) {
    const salesDetail = await this.findOne(id);

    const updatedSalesDetail = {
      ...salesDetail,
      ...updateSalesDetailDto,
    };

    return await this.salesDetailRepository.save(updatedSalesDetail);
  }

  async remove(id: number) {
    const salesDetail = await this.findOne(id);

    return await this.salesDetailRepository.remove(salesDetail);
  }
}
