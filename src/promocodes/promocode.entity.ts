import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class PromoCode {
  @PrimaryColumn()
  code: string;

  @Column({ default: '' })
  qrImage: string;

  @Column()
  evoucherId: string;

  @Column({ default: true })
  hasUsed: boolean;

  @Column({ default: '' })
  phone: string;
}
