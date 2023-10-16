import { IsNotEmpty, IsNumber, isInt } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, IsNull } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({ default: "123",  })
    @IsNotEmpty()
    password: string

    @Column()
    @IsNumber()
    age: number

    @CreateDateColumn({ type: "timestamp" })
    create_time: Date
}
