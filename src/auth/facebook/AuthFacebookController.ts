import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard }                            from '@nestjs/passport';

@Controller('auth')
export class AuthFacebookController {


    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    public googleLogin() {

        // initiates the Google OAuth2 login flow

    }

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    public googleLoginCallback(@Req() req, @Res() res) {

        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;

        if (jwt) {

            res.redirect('http://localhost:4200/login/succes/' + jwt);

        } else {

            res.redirect('http://localhost:4200/login/failure');

        }
    }


    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    public protectedResource() {

        return 'JWT is working!';

    }

}
