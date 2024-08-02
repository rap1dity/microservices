import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskService } from "./tasks.service";
import { CreateTaskDto } from "common/common/dto/create-task.dto";
import { User } from "../users/user.decorator";
import { User as UserEntity } from "common/common/entities/users.entity"
import { JwtAuthGuard } from "common/common/guards/jwt-auth.guard";
import { Task } from "common/common/entities/tasks.entity";

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @ApiOperation({summary: 'Task creation'})
    @ApiResponse({status: 200, type: Task})
    @Post()
    create(@Body() dto: CreateTaskDto,
           @User() user: UserEntity) {
        return this.taskService.create(dto, user.id);
    }

    @ApiOperation({summary: 'Get task by id'})
    @ApiResponse({status: 200, type: Task})
    @Get(':id')
    getOneById(@Param('id', ParseIntPipe) id: number,
               @User() user: UserEntity) {
        return this.taskService.getOneById(id, user.id);
    }

    @ApiOperation({summary: 'Update task by id'})
    @ApiResponse({status: 200, type: Task})
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
           @Body() dto: CreateTaskDto,
           @User() user: UserEntity) {
        return this.taskService.update(id, dto, user.id);
    }

    @ApiOperation({summary: 'Delete task by id'})
    @ApiResponse({status: 200})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number,
           @User() user: UserEntity) {
        return this.taskService.delete(id, user.id);
    }
}
