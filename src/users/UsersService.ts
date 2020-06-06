import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository }   from './UserRepository';

@Injectable()
export class UsersService {

    public constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {

    }

}
