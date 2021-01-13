import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY') private userRepository: typeof User) {}

    /**
     * Find user by username
     * 
     * @param username 
     */
    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                username
            }
        })
    }

    /**
     * Find user by email
     * 
     * @param email 
     */
    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                email
            }
        })
    }

    /**
     * Find user by primary key
     * 
     * @param userId 
     */
    async findById(userId: string): Promise<User> {
        return this.userRepository.findByPk(userId)
    }

    /**
     * Store new user to the database
     * 
     * @param body 
     */
    async save(body: any) {
        try {
            let user: User = this.userRepository.build({...body});
            return user.save();
        } catch (e) {
            console.log('error registering an user', e)
            return null;
        }
    }
}
