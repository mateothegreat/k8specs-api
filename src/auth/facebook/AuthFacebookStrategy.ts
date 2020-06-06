import { Injectable }       from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy }         from 'passport-facebook';

@Injectable()
export class AuthFacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

    public constructor() {

        super({

            clientID: process.env.OAUTH_FACEBOOK_CLIENT_ID,     // <- Replace this with your client id
            clientSecret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET, // <- Replace this with your client secret
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            passReqToCallback: true,
            // scope: [ 'profile', 'email', 'openid' ]
            profileFields: [ 'id', 'displayName', 'photos', 'email' ]


        });

    }


    public async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {

        try {

            console.log(profile);

            const jwt: string = 'placeholderJWT';
            const user =
                {
                    jwt
                };

            done(null, user);

        } catch (err) {

            // console.log(err)
            done(err, false);

        }

    }

}
