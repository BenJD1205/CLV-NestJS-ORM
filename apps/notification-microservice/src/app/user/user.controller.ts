import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationDto } from '@nest-training/shared/dto'
import { UserCMD } from '@nest-training/shared/command';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    
  @EventPattern(UserCMD.CREATE)
  handleUserCreate(@Payload() data: NotificationDto) {
    this.userService.create(data);
  }
}
