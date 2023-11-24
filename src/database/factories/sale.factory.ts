// sale.factory.ts

import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Sale } from '../../sales/entities/sale.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { SalesDetail } from '../../sales-details/entities/sales-detail.entity';

define(Sale, (faker: typeof Faker, context: { customer: Customer }) => {
  const startDate = new Date(2021, 0, 1);
  const endDate = new Date();

  const sale = new Sale();
  sale.total = faker.random.number({ min: 50, max: 250 });
  sale.discount = faker.random.number({ min: 0, max: 30 });
  sale.createdAt = faker.date.between(startDate, endDate);
  sale.customer = context.customer;

  // Genera un número aleatorio entre 1 y 10 para la cantidad de detalles de venta
  const numberOfDetails = faker.random.number({ min: 1, max: 10 });

  // Crea y asigna detalles de venta a la venta
  const salesDetails = factory(SalesDetail)({ sale, numberOfDetails });
  //sale.saleDetail = salesDetails;

  // Calcula el total de la venta como la suma de los totales de los SalesDetails
  sale.total = Array.isArray(sale.saleDetail)
    ? sale.saleDetail.reduce((total, salesDetail) => total + (salesDetail.total || 0), 0)
    : 0;

  return sale;
});

/* import * as Faker from 'faker';
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
 */