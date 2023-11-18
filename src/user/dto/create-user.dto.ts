import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  cellphone: string;

  @IsNumber()
  rolId: number;
}
