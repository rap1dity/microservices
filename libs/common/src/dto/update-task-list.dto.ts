import { IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskListDto {
    @ApiProperty({example: 'To do', description: 'TaskList title'})
    @IsString()
    @Length(4, 16, { message: 'Must be at least 4 characters' })
    readonly title: string;

    @ApiProperty({example: 2, description: 'TaskList order in project'})
    @IsNumber()
    readonly order: number;
}