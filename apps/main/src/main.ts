import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function start() {
  const PORT = process.env.MAIN_PORT || 5000;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBIT_HOST}:5672`],
        queue: 'users_queue',
        queueOptions: {
          durable: false
        }
      }
    });

  const httpApp = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('Main service Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('/api', httpApp, document);

  await app.listen()
  await httpApp.listen(PORT, () =>
    console.log(`HTTP server is listening on PORT ${PORT}`)
  );
}
start();
