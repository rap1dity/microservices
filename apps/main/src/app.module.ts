import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { ProjectsModule } from "./projects/projects.module";
import { TasksModule } from "./tasks/tasks.module";
import { TaskListsModule } from "./task-lists/task-lists.module";
import { TaskFieldsModule } from "./task-fields/task-fields.module";
import { TaskFieldsValuesModule } from "./task-fields-values/task-fields-values.module";
import { Project, Role, Task, TaskField, TaskFieldValue, TaskList, User } from "common/common";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Project, TaskList, Task, Role, TaskField, TaskFieldValue],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    ProjectsModule,
    TasksModule,
    TaskListsModule,
    TaskFieldsModule,
    TaskFieldsValuesModule
  ]
})
export class AppModule {}
