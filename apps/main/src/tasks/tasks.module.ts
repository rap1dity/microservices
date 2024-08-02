import { forwardRef, Module } from "@nestjs/common";
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "common/common/entities/tasks.entity";
import { TaskListsModule } from "../task-lists/task-lists.module";
import { TaskFieldsValuesModule } from "../task-fields-values/task-fields-values.module";
import { GuardsModule } from "common/common";

@Module({
    controllers: [TasksController],
    providers: [TaskService],
    imports: [
        TypeOrmModule.forFeature([Task]),
        UsersModule,
        TaskListsModule,
        forwardRef(() => TaskFieldsValuesModule),
        GuardsModule
    ],
    exports: [
        TaskService
    ]
})
export class TasksModule {}
