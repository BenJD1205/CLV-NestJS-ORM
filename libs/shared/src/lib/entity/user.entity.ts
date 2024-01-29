import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({name:"user_name"})
  userName: string;

  @Column({name:"email"})
  email: string;

  @Column()
  password: string;

  @Column({name:"office_code"})
  officeCode: string;

  @Column({name:"country_code"})
  countryCode: string;

  @Column({name:"is_active"})
  isActive: boolean;

  @Column({ name: "gender" })
  gender: string;

  @Column({ name: "phone" })
  phone: string;

  @Column({ name: "role" })
  role: string;

  @CreateDateColumn({name:"created_at"})
  createdAt:Date

  @UpdateDateColumn({name:"updated_at"})
  updatedAt: Date
  
  @DeleteDateColumn({ name: "deleted_at", nullable:true })
  deletedAt: Date
}
