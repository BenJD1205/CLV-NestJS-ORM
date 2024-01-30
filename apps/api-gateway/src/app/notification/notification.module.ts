import { Module } from '@nestjs/common';
import { \notification\Controller } from './notification/.controller';
import { NotificationController } from './notification.controller';

@Module({
  controllers: [\notification\Controller, NotificationController]
})
export class NotificationModule {}
