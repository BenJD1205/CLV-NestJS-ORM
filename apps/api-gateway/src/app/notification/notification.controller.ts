import { Controller, Inject, Post, BadRequestException, Body} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {NotificationCMD} from '@nest-training/shared/command'
import { catchError } from 'rxjs';

@Controller({version:'1',path:'notification'})
export class NotificationController {
    constructor(
        @Inject('NOTIFICATION_MICROSERVICE') private readonly notificationService: ClientProxy
    ) { }

    @Post('subcriber')
    async subcriber(@Body() subscriberDto) {
        return this.notificationService.send({
            cmd: NotificationCMD.SUBSCRIBED,
        }, subscriberDto).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }
}
