import { Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto,LoginUserDto } from '@nest-training/shared/dto';
import {AuthCMD} from '@nest-training/shared/command'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({cmd:AuthCMD.REGISTER})
    async register(@Payload() createUserDto: RegisterUserDto){
        return this.authService.register(createUserDto);
    }

    @MessagePattern({cmd: AuthCMD.LOGIN})
    async login (@Payload() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    // @MessagePattern({ cmd: 'verify-jwt' })
    // @UseGuards(JwtGuard)
    // async verifyJwt(
    //     @Payload() payload: { jwt: string },
    // ) {
    //     return this.authService.verifyJwt(payload.jwt);
    // }
}