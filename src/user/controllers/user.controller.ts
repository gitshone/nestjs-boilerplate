import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('User / Account')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
}
