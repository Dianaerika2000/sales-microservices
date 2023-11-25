/*
import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { User } from '../../user/entities/user.entity';
import { Rol } from '../../rol/entities/rol.entity';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.name = `${firstName} ${lastName}`;
  user.password = faker.random.word();
  user.email = faker.internet.email();
  user.cellphone = faker.phone.phoneNumber();


  // Crea un rol utilizando el factory y asigna el ID aleatorio
  user.rol = factory(Rol)() as any;

  return user;
});
*/
