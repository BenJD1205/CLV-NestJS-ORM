import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {User} from '@nest-training/shared/entity'
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync, compareSync} from 'bcryptjs';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '@nest-training/shared/dto';

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

    isValidPassword(password: string, hash: string) {
        return compareSync(password, hash);
    }

    async create(userDto){
        const userExist = await this.userRepository.findOneBy({email: userDto.email})
        if(userExist){
            throw new RpcException('User already exist');
        }
        const hashPassword = this.getHashPassword(userDto.password);
        const user = new User()
        user.userName = userDto.username
        user.password = hashPassword
        user.email = userDto.email;
        if ('role' in userDto) {
            user.role = userDto.role;
            user.isActive = userDto.is_active;
            user.officeCode = userDto.office_code;
            user.countryCode = userDto.country_code;
        }
        await this.userRepository.save(user);
        return user
    }

    async getAll() {
        return await this.userRepository.find();
    }

    async getProfile(userId: string) {
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
    }

    async update(userDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id: userDto.id });
        if(!user) throw new RpcException("User not found")
        const updateUser = new User()
        updateUser.userName = userDto.username,
        updateUser.email = userDto.email,
        updateUser.isActive = userDto.is_active,
        updateUser.gender = userDto.gender,
        updateUser.countryCode = userDto.country_code
        updateUser.officeCode = userDto.office_code
        await this.userRepository.save(updateUser);
        return updateUser
    }

    async delete(userId: string) {
        return await this.userRepository.delete(userId);
    }

    async findByRefreshToken(refreshToken: string) {
        return await this.userRepository.findOneBy({refreshToken: refreshToken})
    }
}
