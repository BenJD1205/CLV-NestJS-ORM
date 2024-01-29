import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserCMD } from '@nest-training/shared/command';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @MessagePattern({cmd:UserMessage.GET_ALL })
    // async getAll(){
    //     return this.userService.getAll();
    // }

    // @MessagePattern({cmd:UserMessage.GET_PROFILE })
    // async getProfile(@Payload() userId){
    //     return this.userService.getProfile(userId);
    // }

    // @MessagePattern({cmd:UserMessage.GET })
    // async getUser(@Payload() userId){
    //     return this.userService.getProfile(userId);
    // }

    @MessagePattern({cmd: UserCMD.CREATE})
    async create(@Payload() userDto){
        return this.userService.create(userDto);
    }

    // @MessagePattern({cmd: UserMessage.UPDATE})
    // async update(@Payload() userDto){
    //     return this.userService.update(userDto);
    // }

    // @MessagePattern({cmd: UserMessage.DELETE})
    // async delete(@Payload() userId){
    //     return this.userService.delete(userId);
    // }
}