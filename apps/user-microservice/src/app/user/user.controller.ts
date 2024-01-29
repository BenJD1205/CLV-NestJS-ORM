import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserCMD } from '@nest-training/shared/command';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({cmd:UserCMD.GET_ALL })
    async getAll(){
        return this.userService.getAll();
    }

    @MessagePattern({cmd:UserCMD.GET_PROFILE })
    async getProfile(@Payload() user) {
        const { id } = user;
        return this.userService.getProfile(id);
    }

    @MessagePattern({cmd:UserCMD.GET })
    async getUser(@Payload() user) {
        const { id } = user;
        return this.userService.getProfile(id);
    }

    @MessagePattern({cmd: UserCMD.CREATE})
    async create(@Payload() userDto){
        return this.userService.create(userDto);
    }

    @MessagePattern({cmd: UserCMD.UPDATE})
    async update(@Payload() userDto){
        return this.userService.update(userDto);
    }

    @MessagePattern({cmd: UserCMD.DELETE})
    async delete(@Payload() user) {
        const { id } = user;
        return this.userService.delete(id);
    }
}