
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(signinUserDto: SigninUserDto) {
    const { email, password } = signinUserDto;

    const user = await this.userService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwt = this.generateJwt({email: user.email });

    return {
      ...user,
      access_token: jwt,
    };
  }

  private generateJwt(payload: JWTPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
