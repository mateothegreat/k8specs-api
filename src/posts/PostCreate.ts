import { EntityBase }      from '@nestjs.pro/common/dist/entities/EntityBase';
import { ApiProperty }     from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { Entity }          from 'typeorm';

@Entity('registrations')
export class PostCreate extends EntityBase {

    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @Length(8, 255)
    public password: string;

    @ApiProperty()
    public newsletter: boolean;

}
