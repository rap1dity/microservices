import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "common/common";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Login as User'})
  @ApiResponse({status: 200})
  @Post('login')
  login(@Body() dto: CreateUserDto){
    return this.authService.login(dto);
  }

  @ApiOperation({summary: 'Register new User'})
  @ApiResponse({status: 200})
  @Post('register')
  register(@Body() dto: CreateUserDto){
    return this.authService.register(dto);
  }
}
