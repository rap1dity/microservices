import { Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from "common/common/entities/users.entity";
import { RolesModule } from "../roles/roles.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import { GuardsModule } from "common/common";

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User]),
        RolesModule,
        GuardsModule
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
