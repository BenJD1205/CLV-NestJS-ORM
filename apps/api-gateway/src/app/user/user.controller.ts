import { catchError } from 'rxjs';
import { Controller, Get, Inject, BadRequestException, Post, Body, Put, Param, Delete,UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@nest-training/shared/decorator'
import {AuthGuard} from '@nest-training/shared/guard'
import { UserCMD } from '@nest-training/shared/command';
import { CreateUserDto } from '@nest-training/shared/dto';

@Controller({ version: '1', path: 'user' })
export class UserController {

    constructor(
        @Inject('USER_MICROSERVICE') private readonly userService: ClientProxy
    ){}

    @Get()
    async getAll(){
        return this.userService.send({
            cmd: UserCMD.GET_ALL,
        },{}).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@User() user){
        return this.userService.send({
            cmd: UserCMD.GET_PROFILE,
        },user).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Get(':id')
    async getUser(@Param() id: string){
        return this.userService.send({
            cmd: UserCMD.GET,
        }, id).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Post('create')
    async createUser(@Body() userDto: CreateUserDto){
        return this.userService.send({
            cmd: UserCMD.CREATE,
        },userDto).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Put(':id')
    async updateUser(@Param() id:string ,@Body() userDto: CreateUserDto) {
        const user = {
            ...userDto,
            id,
        }
        return this.userService.send({
            cmd: UserCMD.UPDATE,
        },user).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Delete(':id')
    async deleteUser(@Param() id: string) {
        return this.userService.send({
            cmd: UserCMD.DELETE,
        },id).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }
}