import { Sale } from "../../sales/entities/sale.entity";
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

  @Column({ name: 'code_product', nullable: true })
  codeProduct: string;

  @ManyToOne(
    () => Sale,
    sale => sale.saleDetail,
  )
  sale: Sale;
}
