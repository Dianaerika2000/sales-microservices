import { DataSource } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Sale } from '../../sales/entities/sale.entity';
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
      const randomIndex = Math.floor(Math.random() * (existingCustomers.length));
      const customer = existingCustomers[randomIndex];
      await factory(Sale)({customer}).createMany(2);

    } else{
      console.log('No se encontraron clientes existentes en la base de datos.');
    }
  }
}
