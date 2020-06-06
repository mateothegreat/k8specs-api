import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

    @Column()
    public email: string;

}
