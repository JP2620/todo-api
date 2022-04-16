import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'user_id'
    })
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    surname: string;

    @Column({
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        nullable: false
    })
    password: string;
}