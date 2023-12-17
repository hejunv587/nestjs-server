import { Upload } from "src/upload/entities/upload.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { About } from "./about.entity";
import { QA } from "./qa.entity";


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  name: string;

  @OneToMany(() => Upload, upload => upload.product)
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
  @OneToMany(() => About, about => about.product)
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
  @OneToMany(() => About, qa => qa.product)
  qa: QA[];
}