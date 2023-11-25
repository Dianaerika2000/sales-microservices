// sales-detail.factory.ts
/*
import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { SalesDetail } from '../../sales-details/entities/sales-detail.entity';
import { Sale } from '../../sales/entities/sale.entity';

define(SalesDetail, (faker: typeof Faker, context: { sale: Sale }) => {
  let codeProduct = faker.random.number({ min: 1, max: 111 });

  if (codeProduct < 100) {
    codeProduct = "0000" + codeProduct.toString();
  } else {
    codeProduct = "000" + codeProduct.toString();
  }

  const salesDetail = new SalesDetail();
  salesDetail.codeProduct = codeProduct;
  salesDetail.price = faker.random.number({ min: 1, max: 40 });
  salesDetail.quantity = faker.random.number({ min: 1, max: 20 });
  salesDetail.total = salesDetail.price * salesDetail.quantity;

  salesDetail.sale = context.sale;

  return salesDetail;
});
*/
/* import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Sale } from '../../sales/entities/sale.entity';
import { SalesDetail } from '../../sales-details/entities/sales-detail.entity';

define(SalesDetail, (faker: typeof Faker, context: { sale: Sale }) => {
  let codeProduct = faker.random.number({ min: 1, max: 111 });

  if (codeProduct < 100) {
    codeProduct = "0000" + codeProduct.toString();
  } else {
    codeProduct = "000" + codeProduct.toString();
  }

  const salesDetail = new SalesDetail();
  salesDetail.codeProduct = codeProduct;
  salesDetail.price = faker.random.number({ min: 10, max: 100 });
  salesDetail.quantity = faker.random.number({ min: 1, max: 5 });
  salesDetail.total = salesDetail.price * salesDetail.quantity;
  
  salesDetail.sale = context.sale;
  salesDetail.sale.total = salesDetail.sale.total + salesDetail.total;
  
  return salesDetail;
});


 */