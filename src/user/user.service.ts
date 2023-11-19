import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolService } from 'src/rol/rol.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly rolService: RolService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { rolId, email, password, ...userData } = createUserDto;
    const rol = await this.rolService.findOne(rolId);
    
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) throw new BadRequestException(`User with email ${email} already exists`);

    const user = this.userRepository.create({
      ...userData,
      email,
      password: await bcrypt.hash(password, 10),
      rol,
    });

    return await this.userRepository.save(user); 
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { rolId, ...userData } = updateUserDto;
    const rol = await this.rolService.findOne(rolId);

    const user = await this.userRepository.preload({
      id: id,
      ...userData,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.rol = rol;

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    return await this.userRepository.remove(user);
  }
}
