import { Sale } from "src/sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => Sale, 
    sale => sale.customer,
    { cascade: true }
  )
  sales: Sale[];
}
