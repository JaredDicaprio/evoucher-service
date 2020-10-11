import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evoucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  expiryDate: Date;

  @Column({ default: '' })
  image: string;

  @Column()
  amount: number;

  @Column()
  paymentMethod: string;

  @Column()
  quantity: number;

  @Column()
  buyLimit: number;

  @Column()
  giftLimit: number;

  @Column({ default: true })
  isActive: boolean;
}
