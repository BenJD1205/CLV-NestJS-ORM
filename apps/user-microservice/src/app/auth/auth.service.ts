import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from '@nest-training/shared/entity'
import { LoginUserDto, RegisterUserDto } from '@nest-training/shared/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private userService: UserService,
    ){}

    async login(userDto: LoginUserDto) {
        return userDto
    }

    async register(userDto: RegisterUserDto) {
        return this.userService.create(userDto)
    }
}
