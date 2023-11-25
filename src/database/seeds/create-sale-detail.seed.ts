/*
import { DataSource } from 'typeorm';
import { SalesDetail } from '../../sales-details/entities/sales-detail.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateSaleDetailSeed implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<any> {
    // Obtener todas las facturas existentes desde la base de datos
    const existingSales = await connection
      .createQueryBuilder()
      .select()
      .from(Sale, 'sale')
      .execute();

    if (existingSales.length) {
      const randomIndex = Math.floor(Math.random() * existingSales.length);
      // Si se encontró una factura existente, crea detalles de ventas asociados a esa factura
      const sale = existingSales[randomIndex];
      await factory(SalesDetail)({ sale }).createMany(10);
    } else {
      console.log('No se encontraron facturas existentes en la base de datos.');
    }
  }
}
*/
