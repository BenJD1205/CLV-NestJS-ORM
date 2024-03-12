import { Injectable } from '@nestjs/common';
import {INotification} from '@nest-training/shared/interface'

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async create(data: INotification) {
    console.log(data)
  }
}
