import { forwardRef, Module } from "@nestjs/common";
import { TaskFieldsValuesController } from './task-fields-values.controller';
import { TaskFieldValuesService } from "./task-fields-values.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { TaskFieldValue } from "common/common/entities/task-fields-values.entity";
import { TasksModule } from "../tasks/tasks.module";
import { TaskFieldsModule } from "../task-fields/task-fields.module";
import { GuardsModule } from "common/common";

@Module({
    controllers: [TaskFieldsValuesController],
    providers: [TaskFieldValuesService],
    imports: [
        TypeOrmModule.forFeature([TaskFieldValue]),
        UsersModule,
        TaskFieldsModule,
        forwardRef(() => TasksModule),
        GuardsModule
    ],
    exports: [
        TaskFieldValuesService
    ]
})
export class TaskFieldsValuesModule {}
