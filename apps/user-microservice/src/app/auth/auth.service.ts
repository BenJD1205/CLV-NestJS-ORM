import { Repository } from 'typeorm';
import ms from 'ms';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { compareSync } from 'bcryptjs';
import {User} from '@nest-training/shared/entity'
import { LoginUserDto, RegisterUserDto } from '@nest-training/shared/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }
    
    createRefreshToken = (payload) => {
        const refresh_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn:
            ms(this.configService.get<string>('JWT_REFRESH_EXPIRATION')) / 1000,
        });
        return refresh_token;
    };

    createAccessToken = (payload) => {
        const access_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn:
            ms(this.configService.get<string>('JWT_ACCESS_EXPIRATION')) / 10000,
        });
        return access_token;
    };

    async login(userDto: LoginUserDto) {
        const {email, password} = userDto;
        const findUser = await this.userRepository.findOneBy({email: email})
        if(!findUser){
            throw new RpcException('User not found');
        }
        const isMatchPassword = compareSync(password, findUser.password);
        if(!isMatchPassword){
            throw new RpcException('Invalid credentials');
        }
        delete findUser.password;
        const refreshToken = this.createRefreshToken({email:findUser.email,username:findUser.userName})
        const accessToken = this.createAccessToken({email:findUser.email, username:findUser.userName, role:findUser.role})
;       return {
            email:findUser.email,
            name:findUser.userName,
            access_token: accessToken,
            refresh_token: refreshToken,
        }
    }

    async register(userDto: RegisterUserDto) {
        return this.userService.create(userDto)
    }

    async verifyJwt(jwt: string): Promise<{ user; exp: number }> {
        if (!jwt) {
            throw new UnauthorizedException();
        }

        try {
            const user = await this.jwtService.verifyAsync(jwt);
            return user;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async processNewToken(refreshToken) {
        try {
            this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
        }
        catch (err) {
            throw new UnauthorizedException();
        }
    }

    async validateUser(username: string, pass: string){
        const user = await this.userRepository.findOneBy({email: username});
        const isValid = this.userService.isValidPassword(pass, user?.password);
        if (isValid) {
            return user;
        }
        return null;
    }
}
