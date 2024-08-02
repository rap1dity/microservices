import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "common/common/dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "common/common/entities/users.entity";
import { Roles } from "common/common/guards/roles-auth.decorator";
import { RolesGuard } from "common/common/guards/roles.guard";
import { JwtAuthGuard } from "common/common/guards/jwt-auth.guard";
import { MessagePattern } from "@nestjs/microservices";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'create_user'})
    authCreate(dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiOperation({summary: 'User creation'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiOperation({summary: 'Get Concrete User'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number){
      return this.usersService.getOneById(id);
    }

    @MessagePattern({ cmd: 'get_user_by_username'})
    async getOneByUsername(username: string) {
        return this.usersService.getOneByUsername(username);
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateUserDto
    ){
        return this.usersService.update(id, dto);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }

}
