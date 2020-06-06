import { ResourceAlreadyExistsException }  from '@nestjs.pro/common';
import { SendgridUtil }                    from '@nestjs.pro/common/dist/mail/SendgridUtil';
import { MessagingClient }                 from '@nestjs.pro/common/dist/messaging/MessagingClient';
import { JWT }                             from '@nestjs.pro/common/dist/utilities/JWT';
import { JWTResponse }                     from '@nestjs.pro/common/dist/utilities/JWTResponse';
import { User }                            from '@nestjs.pro/rbac/dist/Users/User';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository }                from '@nestjs/typeorm';
import { RandomGenerator }                 from 'typeorm/util/RandomGenerator';
import { PostCreate }                      from './PostCreate';
import { PostsRepository }                 from './PostsRepository';

@Injectable()
export class PostsService {

    public constructor(@InjectRepository(PostsRepository) private readonly registrationRepository: PostsRepository,
                       private readonly messagingClient: MessagingClient) {

    }

    public async register(registrationCreate: PostCreate): Promise<boolean> {

        const user = await this.messagingClient.rpc('streamnvr', 'users', {

            serviceName: 'usersService',
            methodName: 'getByEmail',
            args: [ registrationCreate.email ]

        });

        console.log(user);

        if (user) {

            throw new ResourceAlreadyExistsException('an account with this email address already exists');

        } else {

            const entity = await this.registrationRepository.save({

                email: registrationCreate.email,
                password: registrationCreate.password,
                confirmToken: RandomGenerator.uuid4(),
                newsletter: registrationCreate.newsletter

            });

            SendgridUtil.send(registrationCreate.email, 'support@streamnvr.com', 'd-d005b648e41b49f296efba040f2c41f0', {

                link: `https://signup.streamnvr.com/confirm/${ entity.confirmToken }`

            });

        }

        return true;

    }

    public async confirm(confirmToken: string): Promise<JWTResponse> {

        let entity = await this.registrationRepository.getByToken(confirmToken);

        console.log(entity);

        if (entity.registered) {

            throw new BadRequestException('already registered');

        } else {

            entity.registered = true;

            entity = await this.registrationRepository.save(entity);

            console.log(entity);

            const user = await this.messagingClient.rpc<User>('streamnvr', 'users', {

                serviceName: 'usersService',
                methodName: 'register',
                args: [ entity ]

            });

            return JWT.getToken(user.id);

        }


    }

}
