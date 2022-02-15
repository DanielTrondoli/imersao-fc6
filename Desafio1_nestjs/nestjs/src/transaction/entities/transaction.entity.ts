import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_id: number;

  @Column()
  amount: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
