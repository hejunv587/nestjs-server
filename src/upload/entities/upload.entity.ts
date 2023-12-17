import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Upload {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string;

    @Column({ nullable: true })
    type?: string;

    @Column()
    path: string;

    @Column({ nullable: true })
    desc?: string;

    @Column({ nullable: true })
    thumbnail?: string;

    @ManyToOne(() => Product, product => product.images, { nullable: true })
    @JoinColumn({ name: 'productId' })
    product?: Product;

    @CreateDateColumn({ type: "timestamp" })
    create_time: Date
}
