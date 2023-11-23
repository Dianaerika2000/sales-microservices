import { User } from '../../user/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUserSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await factory(User)().createMany(1);
  }
}
