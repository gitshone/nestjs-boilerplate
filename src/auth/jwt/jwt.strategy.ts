import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    /**
     * Validate request and authenticate user
     * 
     * @param request 
     * @param payload 
     * @param done 
     */
    async validate(payload: any) {
        try {
            const user = await this.userService.findById(payload.userId);

            if (!user) {
                throw new UnauthorizedException('Unauthorized');
            }

            return user;
        } catch (e) {
            console.log(e)
        }
    }
}