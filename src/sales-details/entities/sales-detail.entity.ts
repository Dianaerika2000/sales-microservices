import { Sale } from "src/sales/entities/sale.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SalesDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne(
    () => Sale,
    sale => sale.saleDetail,
  )
  sale: Sale;
}
