import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {User} from '@nest-training/shared/entity'
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync} from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {  
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }
    
     getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash;
    };

    async create(userDto){
        const userExist = await this.userRepository.findOneBy({email: userDto.email})
        if(userExist){
            throw new RpcException('User already exist');
        }
        const hashPassword = this.getHashPassword(userDto.password);
        const user = new User()
        user.userName = userDto.username,
        user.password = hashPassword,
        user.email = userDto.email,
        await this.userRepository.save(user);
        return user
    }
}
