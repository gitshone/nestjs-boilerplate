import { BadRequestException, Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';
import { EmailService } from '../../transporter/services/email.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService) {}

    /**
     * Authenticate an user
     * 
     * @param payload 
     */
    async authenticate(payload: any) {
        try {
            const user = await this.userService.findByUsername(payload.username)
            if (!user) {
                throw new NotFoundException('User not found!')
            }

            const isPasswordMatching = await bcrypt.compare(payload.password, user.password);
            if (!isPasswordMatching) {
                throw new BadRequestException('Password is not correct!')
            }

            const jwtPayload = {
                userId: user.id,
                username: user.username,
                email: user.email
            }

            return {
                accessToken: this.jwtService.sign(jwtPayload)
            }
        } catch (e) {
            throw new HttpException(e.message ?? "Whooops", (e.status in HttpStatus) ? e.status : HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Register a new user
     * 
     * @param payload 
     */
    async register(payload: any) {
        try {
            if (await this.userService.findByEmail(payload.email)) {
                throw new BadRequestException('User with provided email already exists')
            }

            if (await this.userService.findByUsername(payload.username)) {
                throw new BadRequestException('User with provided username already exists')
            }

            const userPayload = {
                username: payload.username,
                email: payload.email,
                password: await bcrypt.hash(payload.password, 10),
                isVerified: false
            }

            const user: User = await this.userService.save(userPayload)

            // create user verification data
            await this.createVerificationData(user)

            return {
                success: (user) ? true : false
            }
        } catch (e) {
            throw new HttpException(e.message ?? "Whooops", (e.status in HttpStatus) ? e.status : HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Try and send an email containing user verification data
     * 
     * @param user 
     */
    private async createVerificationData(user: User) {
        try {
            await this.emailService.send({
                to: user.email,
                subject: 'Account verification',
                template: 'verify-account',
                context: {
                    email: user.email,
                    token: this.jwtService.sign({
                        email: user.email,
                        userId: user.id
                    })
                }
            })
        } catch (e) {
            return null;
        }
    }
}
