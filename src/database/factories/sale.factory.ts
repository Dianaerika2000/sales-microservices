import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Sale } from '../../sales/entities/sale.entity';
import { Customer } from '../../customer/entities/customer.entity';

define(Sale, (faker: typeof Faker, context: { customer: Customer }) => {
  const startDate = new Date(2021, 0, 1);
  const endDate = new Date();

  const sale = new Sale();
  sale.total = faker.random.number({ min: 50, max: 250 });
  sale.discount = faker.random.number({ min: 0, max: 30 });
  sale.createdAt = faker.date.between(startDate, endDate);
  sale.customer = context.customer;

  return sale;
});
