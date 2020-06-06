import { RabbitMQModule }  from '@nestjs-plus/rabbitmq';
import { DBUtilities }     from '@nestjs.pro/common/dist/db/DBUtilities';
import { MessagingClient } from '@nestjs.pro/common/dist/messaging/MessagingClient';
import { RBAC_ENTITIES }   from '@nestjs.pro/rbac/dist';
import { Module }          from '@nestjs/common';
import { TypeOrmModule }   from '@nestjs/typeorm';
import { AuthModule }      from '../auth/AuthModule';
import { Post }            from './Post';
import { PostsController } from './PostsController';
import { PostsRepository } from './PostsRepository';
import { PostsService }    from './PostsService';

@Module({

    imports: [

        DBUtilities.getModule({

            synchronize: true,
            entities: [

                Post,
                ...RBAC_ENTITIES,

            ]

        }),

        TypeOrmModule.forFeature([ PostsRepository ]),

        RabbitMQModule.forRoot({

            exchanges: [

                {

                    name: 'streamnvr',
                    type: 'topic'

                }

            ],
            uri: process.env.RABBITMQ_URI

        }),

        AuthModule

    ],

    controllers: [

        PostsController

    ],

    providers: [

        MessagingClient,
        PostsService

    ],

    exports: [

        PostsService

    ]

})

export class PostsModule {
}
