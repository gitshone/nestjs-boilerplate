import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('User / Account')
@ApiBearerAuth()
@Controller('user')
export class UserController {

    @Get('profile')
    async profile(@Req() req) {
        return req.user
    }
}
