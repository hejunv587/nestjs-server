import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class QA {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    q: string;

    @Column()
    a: string;

    @ManyToOne(() => Product, product => product.qas)
    @JoinColumn({ name: 'productId' })
    product?: Product;
}