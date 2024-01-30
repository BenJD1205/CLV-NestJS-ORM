import { Controller, UseGuards} from '@nestjs/common';
import { JwtGuard } from '@nest-training/shared/guard';
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

    @MessagePattern({cmd: AuthCMD.GET_REFRESH_TOKEN})
    async getRefreshToken (@Payload() refreshTokenDto){
        return this.authService.processNewToken(refreshTokenDto);
    }

    @MessagePattern({ cmd: AuthCMD.VERIFY_JWT })
    @UseGuards(JwtGuard)
    async verifyJwt(
        @Payload() payload: { jwt: string },
    ) {
        return this.authService.verifyJwt(payload.jwt);
    }
}