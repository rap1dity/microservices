import { Module } from '@nestjs/common';
import { TaskListsController } from './task-lists.controller';
import { TaskListsService } from './task-lists.service';
import { ProjectsModule } from "../projects/projects.module";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskList } from "common/common/entities/task-lists.entity";
import { GuardsModule } from "common/common";

@Module({
      controllers: [TaskListsController],
      providers: [TaskListsService],
      imports: [
          TypeOrmModule.forFeature([TaskList]),
          ProjectsModule,
          UsersModule,
          GuardsModule
      ],
      exports: [
          TaskListsService,
      ]
})
export class TaskListsModule {}
