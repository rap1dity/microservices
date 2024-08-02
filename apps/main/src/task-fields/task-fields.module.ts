import { Module } from '@nestjs/common';
import { TaskFieldsController } from './task-fields.controller';
import { TaskFieldsService } from './task-fields.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskField } from "common/common/entities/task-fields.entity";
import { UsersModule } from "../users/users.module";
import { ProjectsModule } from "../projects/projects.module";
import { GuardsModule } from "common/common";

@Module({
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService],
  imports: [
      TypeOrmModule.forFeature([TaskField]),
      UsersModule,
      ProjectsModule,
      GuardsModule
  ],
    exports: [
        TaskFieldsService
    ]
})
export class TaskFieldsModule {}
