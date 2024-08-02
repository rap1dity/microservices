import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, User } from "common/common";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(@Inject('MAIN_SERVICE') private readonly client: ClientProxy,
              private jwtService: JwtService) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.client.send({ cmd: 'get_user_by_username'}, dto.username).toPromise()
    if(candidate){
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.client.send({ cmd: 'create_user' }, {...dto, password: hashPassword}).toPromise();
    return this.generateToken(user);
  }

  private async generateToken(user: User){
    const payload = {username: user.username, id: user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.client.send({ cmd: 'get_user_by_username'}, dto.username).toPromise()
    if(!user)
      throw new UnauthorizedException({message: 'Incorrect username or password'});
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if(user && passwordEquals)
      return user;
    throw new UnauthorizedException({message: 'Incorrect username or password'});
  }
}

