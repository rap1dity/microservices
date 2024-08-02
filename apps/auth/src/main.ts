import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as http from "node:http";

async function start() {
  const PORT = process.env.AUTH_PORT || 5000;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBIT_HOST}:5672`],
        queue: 'auth',
        queueOptions: {
          durable: false
        }
      }
    });

  const httpApp = await NestFactory.create(AuthModule);

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('Auth service Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('/api', httpApp, document);

  await app.listen();
  await httpApp.listen(PORT, () =>
    console.log(`HTTP server is listening on PORT ${PORT}`)
  );
}
start();
