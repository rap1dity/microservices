import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ClientsModule.register([
    {
      name: 'MAIN_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBIT_HOST}:5672`],
        queue: 'users_queue',
        queueOptions: {
          durable: false,
        }
      }
    }
  ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'DEV',
      signOptions: {
        expiresIn: '30d'
      }
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
