import { ConnectionOptions, Factory, Seeder } from 'typeorm-seeding';
import { Rol } from '../../rol/entities/rol.entity'; 

export default class CreateRoleSeed implements Seeder {
  public async run(factory: Factory, connection: ConnectionOptions): Promise<void> {
    await factory(Rol)().createMany(1);  
  }
}
