import { EntityBase }     from '@nestjs.pro/common/dist/entities/EntityBase';
import { ApiProperty }    from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('registrations')
export class Post extends EntityBase {

    @ApiProperty()
    @Column({ unique: true })
    public email: string;

    @ApiProperty()
    @Column()
    public password: string;

    @ApiProperty()
    @Column()
    public confirmToken: string;

    @ApiProperty()
    @Column()
    public newsletter: boolean;

    @ApiProperty()
    @Column({ default: false })
    public registered: boolean;

}
