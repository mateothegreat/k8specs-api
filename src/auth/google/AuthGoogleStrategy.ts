import { Injectable }       from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as jwt             from 'jsonwebtoken';
import { Strategy }         from "passport-google-oauth20";

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy, 'google') {

    public constructor() {

        super({

            clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,     // <- Replace this with your client id
            clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET, // <- Replace this with your client secret
            callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
            scope: [ 'profile', 'email', 'openid' ]

        });

    }

    public async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {

        try {

            console.log(profile);

            const token = jwt.sign({ id: profile.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });

            console.log(token);

            done(null, { jwt: token });

        } catch (err) {

            done(err, false);

        }

    }

}
