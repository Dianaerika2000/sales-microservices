import { Customer } from "src/customer/entities/customer.entity";
import { SalesDetail } from "src/sales-details/entities/sales-detail.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(
    () => Customer,
    customer => customer.sales,
    { eager: true }
  )
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(
    () => SalesDetail,
    salesDetail => salesDetail.sale,
    { cascade: true, eager: true }
  )
  @JoinColumn({ name: 'sales_detail_id' })
  saleDetail: SalesDetail[];
}
