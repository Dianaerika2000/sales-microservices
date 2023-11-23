
import { ConnectionOptions, Factory, Seeder } from 'typeorm-seeding';
import { Customer } from '../../customer/entities/customer.entity';

export default class CreateCustomerSeed implements Seeder {
  public async run(factory: Factory, connection: ConnectionOptions): Promise<void> {
    await factory(Customer)().createMany(50);  
  }
}
