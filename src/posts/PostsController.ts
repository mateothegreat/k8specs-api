import { JWTResponse }                                  from '@nestjs.pro/common/dist/utilities/JWTResponse';
import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags }                                      from '@nestjs/swagger';
import { PostCreate }                                   from './PostCreate';
import { PostsService }                                 from './PostsService';

@ApiTags('Registration')
@Controller('/registration')
export class PostsController {

    public constructor(private readonly registrationService: PostsService) {

    }

    @Post()
    public register(@Body() postCreate: PostCreate): Promise<boolean> {

        return this.registrationService.register(postCreate);

    }

    @Post('/confirm/:confirmToken')
    public confirm(@Param('confirmToken', ParseUUIDPipe) confirmToken: string): Promise<JWTResponse> {

        return this.registrationService.confirm(confirmToken);

    }

}
