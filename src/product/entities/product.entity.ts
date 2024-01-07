import { Upload } from 'src/upload/entities/upload.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { About } from './about.entity';
import { QA } from './qa.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  name: string;

  @Column()
  serie: string;

  @OneToOne(() => Upload, (upload) => upload.product, { eager: true })
  @JoinColumn({ name: 'cover_id' })
  cover: Upload;

  @OneToMany(() => Upload, (upload) => upload.product)
  // @OneToMany(() => Upload)
  images: Upload[];

  @Column()
  description: string;

  @Column()
  overview: string;

  @Column({ type: 'text' })
  functions: string;

  @Column({ type: 'text' })
  advantages: string;

  @Column({ type: 'text' })
  technical_parameters: string;

  // @Column()
  @OneToMany(() => About, (about) => about.product)
  @JoinColumn({ name: 'about' })
  about: About[];

  @Column({ type: 'text' })
  services: string;

  @Column({ type: 'text' })
  whychoose: string;

  @Column({ type: 'text' })
  note: string;

  // @Column()
  // @ValidateNested({ each: true })
  // @Type(() => QA)
  @OneToMany(() => QA, (qa) => qa.product)
  @JoinColumn({ name: 'qas' })
  qas: QA[];
}
