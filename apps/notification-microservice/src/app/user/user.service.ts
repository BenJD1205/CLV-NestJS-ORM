import { Injectable } from '@nestjs/common';
import { INotification } from '@nest-training/shared/interface'
import {ENotification} from '@nest-training/shared/enum'
import { NotificationRepository } from '@nest-training/shared/repository';

@Injectable()
export class UserService {
    constructor(private readonly notificationRepository:NotificationRepository){}

    async create(data: INotification) {
        await this.notificationRepository.create({
            title: ENotification.CREATE_USER,
            description: data.description,
            user:data.userId,
            isRead: false
        })
    }
}
