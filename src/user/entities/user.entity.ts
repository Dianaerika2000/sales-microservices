import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cellphone: string;

  @ManyToOne(
    () => Rol, 
    (rol) => rol.users,
    { eager: true}
  )
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;
}
