import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { SaleDto } from './dto/create-sale-detail.dto';
import { SalesDetailsService } from 'src/sales-details/sales-details.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    private customerService: CustomerService,
    private salesDetailService: SalesDetailsService,
  ) { }

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

  async createSaleWithDetail(createSaleDto: SaleDto) {
    const { customerId, details, ...saleData } = createSaleDto;

    const customer = await this.customerService.findOne(customerId);

    const salesDetailPromises = details.map((detail) => {
      return this.salesDetailService.create(detail);
    });

    const salesDetail = await Promise.all(salesDetailPromises);

    const sale = this.saleRepository.create({
      ...saleData,
      customer,
      saleDetail: salesDetail,
    });

    return await this.saleRepository.save(sale);
  }

  async getAllSales(): Promise<Sale[]> {
    return await this.saleRepository.find({ order: { id: 'ASC' } });
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

    const sale = this.saleRepository.update(id, {
      ...saleData,
      customer,
    });

    return this.getSaleById(id);
  }

  async deleteSale(id: number) {
    const sale = await this.getSaleById(id);
    await this.saleRepository.remove(sale);
  }

  async getVolumenSales(dateStart: Date, dateEnd: Date) {
    const periodSales = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.saleDetail', 'saleDetail')
      .where('sale.created_at BETWEEN :dateStart AND :dateEnd', { dateStart, dateEnd })
      .getMany();

    const volumenVentas = periodSales.reduce((total, venta) => {
      const cantidadProductosVendidos = venta.saleDetail.reduce(
        (totalDetalle, salesDetail) => totalDetalle + salesDetail.quantity,
        0
      );

      return total + cantidadProductosVendidos;
    }, 0);

    return volumenVentas;
  }

  async obtenerProductosMasVendidosConDetalle(): Promise<any[]> {
    const productosMasVendidos = await this.saleRepository.query('SELECT sd.code_product AS producto_id, SUM(sd.quantity) AS cantidad_vendida, COUNT(DISTINCT s.customer_id) AS clientes_que_compraron FROM public.sale s INNER JOIN public.sales_detail sd ON s.id = sd."saleId" GROUP BY sd.code_product ORDER BY cantidad_vendida DESC;');

    return productosMasVendidos;
  }

  async getNewsletterRevenueOverTime(year: number): Promise<any[]> {
    const query = `
    SELECT
      EXTRACT(YEAR FROM created_at) AS year,
      EXTRACT(MONTH FROM created_at) AS month,
      SUM(total) AS total_revenue
    FROM
      sale
    WHERE
      EXTRACT(YEAR FROM created_at) = $1
    GROUP BY
      EXTRACT(YEAR FROM created_at),
      EXTRACT(MONTH FROM created_at)
    ORDER BY
      year DESC, month DESC;
    `;

    const results = await this.saleRepository.query(query, [year]);
    console.log(results)
    return results;
  }

  async getUltimasVentas(): Promise<any[]> {
    const query = `
    SELECT
      s.id AS sale_id,
      s.total AS total_comprado,
      COUNT(sd.id) AS cantidad_items_comprados,
      c.name AS nombre_cliente,
      s.created_at AS fecha_venta
    FROM
      sale s
    JOIN
      customer c ON s.customer_id = c.id
    JOIN
      sales_detail sd ON s.id = sd."saleId"
    GROUP BY
      s.id, c.name, s.total, s.created_at
    ORDER BY
      s.created_at DESC
    LIMIT
      5;
    `;

    const results = await this.saleRepository.query(query);
    return results;
  }

  async getTotalIncome() {
    const query = `SELECT SUM(total) AS total FROM sale`;

    const results = await this.saleRepository.query(query);
    
    return results;
  }
}
