import { UnauthorizedException, Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ClientProxy } from "@nestjs/microservices";
import { AuthCMD } from "@nest-training/shared/command";
import { Server, Socket } from 'socket.io';
import { catchError, of, switchMap } from 'rxjs';

@WebSocketGateway({ cors: true })
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
    constructor(@Inject('USER_MICROSERVICE') private readonly userService: ClientProxy){}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
    afterInit(socket: Socket) {
        console.log(socket)
    }

    async handleConnection(socket: Socket) {
        console.log('connect', socket.id);
        const authHeader = socket.handshake.headers.authorization;
        if (authHeader && authHeader.split(' ')[1]) {
            const jwt = authHeader.split(' ')[1]
            this.userService.send({ cmd: AuthCMD.VERIFY_JWT }, { jwt}).pipe(
                switchMap((user) => {
                if (!user.exp) return of(false);
                socket.data.user = user;
                socket.join(socket.data.user);
                console.log('connect success', socket.data.user)

                const TOKEN_EXP_MS = user.exp * 1000;

                const isJwtValid = Date.now() < TOKEN_EXP_MS;

                return of(isJwtValid);
            }),
            catchError(() => {
                socket.disconnect()
                throw new UnauthorizedException();
            }),
        );
        } else {
            socket.disconnect()
        }
    }

    async handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log('disconnect', socket.id, socket.data?.email);
    }
}