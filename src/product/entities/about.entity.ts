import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class About {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    desc: string;

    @ManyToOne(() => Product, product => product.about, { nullable: true })
    @JoinColumn({ name: 'productId' })
    product?: Product;
}