import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { userProviders } from './entities/user.providers';
import { UserController } from './controllers/user.controller';

@Module({
    providers: [UserService, ...userProviders],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
