import { Module } from '@nestjs/common';
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "common/common/entities/projects.entity";
import { UsersModule } from "../users/users.module";
import { GuardsModule } from "common/common";

@Module({
      controllers: [ProjectsController],
      providers: [ProjectsService],
      imports: [
          TypeOrmModule.forFeature([Project]),
          UsersModule,
          GuardsModule
      ],
      exports: [
          ProjectsService,
      ]
})
export class ProjectsModule {}
