import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import {User} from './user.entity'

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
    
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User; 
    
  @Column({name:"is_read"})
  isRead: boolean;

  @CreateDateColumn({name:"created_at"})
  createdAt:Date

  @UpdateDateColumn({name:"updated_at"})
  updatedAt: Date
  
  @DeleteDateColumn({ name: "deleted_at", nullable:true })
  deletedAt: Date
}
