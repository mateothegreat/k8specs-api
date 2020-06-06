import { Injectable }       from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy }         from "passport-github";

@Injectable()
export class AuthGithubStrategy extends PassportStrategy(Strategy, 'github') {

    public constructor() {

        super({

            clientID: process.env.OAUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
            // callbackURL: process.env.OAUTH_GITHUB_CALLBACK_URL,
            passReqToCallback: true,
            scope: [ 'profile', 'email', 'openid' ]

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
