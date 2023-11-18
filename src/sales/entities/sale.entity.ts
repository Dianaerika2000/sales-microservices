import { Customer } from "src/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  discount: number;

  @CreateDateColumn({ name : 'created_at', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @ManyToOne(
    () => Customer,
    customer => customer.sales
  )
  customer: Customer;
}
