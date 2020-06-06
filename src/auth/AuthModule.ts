import { Module }                 from '@nestjs/common';
import { AuthService }            from './AuthService';
import { AuthFacebookController } from './facebook/AuthFacebookController';
import { AuthFacebookStrategy }   from './facebook/AuthFacebookStrategy';
import { AuthGithubController }   from './github/AuthGithubController';
import { AuthGithubStrategy }     from './github/AuthGithubStrategy';
import { AuthGoogleController }   from './google/AuthGoogleController';
import { AuthGoogleStrategy }     from './google/AuthGoogleStrategy';
import { JwtStrategy }            from './JwtStrategy';

@Module({

    controllers: [

        AuthFacebookController,
        AuthGoogleController,
        AuthGithubController

    ],

    providers: [

        AuthService,
        AuthFacebookStrategy,
        AuthGoogleStrategy,
        AuthGithubStrategy,
        JwtStrategy

    ]

})
export class AuthModule {
}
