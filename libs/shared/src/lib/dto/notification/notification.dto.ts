import { IsString } from 'class-validator';

export class NotificationDto{
    @IsString({ message: 'Title is required!' })
    title: string;

    description: string;

    userId: string;

    isRead: boolean;
}