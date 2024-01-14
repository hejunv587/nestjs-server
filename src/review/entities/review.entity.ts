import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Upload } from 'src/upload/entities/upload.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  score: number;

  @Column()
  content: string;

  @OneToMany(() => Upload, (upload) => upload.review)
  images?: Upload[];

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product?: Product;
}
