import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
    constructor(
        @Inject('NOTIFICATION_MICROSERVICE') private readonly notificationService: ClientProxy
    ) { }
}
