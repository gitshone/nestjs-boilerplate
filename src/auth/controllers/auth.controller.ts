import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUser.dto';
import { RegisterUserDTO } from '../dtos/RegisterUser.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth / Identity')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    /**
     * Authenticate an user
     * 
     * @param body 
     */ 
    @Post('login')
    async login(@Body() body: AuthenticateUserDTO) {
        return this.authService.authenticate(body)
    }

    /**
     * Register a new user
     * 
     * @param body 
     */
    @Post('register')
    async register(@Body() body: RegisterUserDTO) {
        return this.authService.register(body);
    }
}
