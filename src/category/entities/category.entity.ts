import { IsNotEmpty, IsNumber, isInt } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, IsNull } from 'typeorm'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn({ type: "timestamp" })
    create_time: Date
}
