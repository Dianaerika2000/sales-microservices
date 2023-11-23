import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Rol } from '../../rol/entities/rol.entity';

define(Rol, (faker: typeof Faker) => {
  const name = faker.name.jobTitle();
  const description = faker.lorem.sentence();

  const rol = new Rol();
  rol.name = name;
  rol.description = description;

  return rol;
});
