import { DataSource } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { SalesDetail } from '../../sales-details/entities/sales-detail.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateSaleSeed implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<any> {
    // Obtener todos los clientes existentes desde la base de datos
    const existingCustomers = await connection
      .createQueryBuilder()
      .select()
      .from(Customer, 'customer')
      .orderBy('RANDOM()')
      .execute();

    if (existingCustomers.length) {
      // Crear varias ventas con detalles de venta asociados
      const numberOfSales = 30; // Puedes ajustar según tus necesidades
      for (let i = 0; i < numberOfSales; i++) {
        const randomIndex = Math.floor(Math.random() * existingCustomers.length);
        const customer = existingCustomers[randomIndex];

        // Crear una venta
        const sale = await factory(Sale)({ customer }).create();

        // Generar un número aleatorio entre 1 y 5 para la cantidad de detalles de venta
        const numberOfDetails = Math.floor(Math.random() * 2) + 1;
        await factory(SalesDetail)({ sale }).createMany(numberOfDetails);

        // Recargar la venta desde la base de datos para asegurarse de tener las relaciones actualizadas
        const reloadedSale = await connection
          .getRepository(Sale)
          .findOne({ where: { id: sale.id }, relations: ['saleDetail'] });

        // Calcular el total como la suma de los totales de los detalles de la venta
        reloadedSale.total = reloadedSale.saleDetail.reduce(
          (total, salesDetail) => total + (salesDetail.total || 0),
          0
        );

        // Guardar la venta actualizada en la base de datos
        await connection.getRepository(Sale).save(reloadedSale);
      }
    } else {
      console.log('No se encontraron clientes existentes en la base de datos.');
    }
  }
}

