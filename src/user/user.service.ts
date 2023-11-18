import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolService } from 'src/rol/rol.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly rolService: RolService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { rolId, ...userData } = createUserDto;
    const rol = await this.rolService.findOne(rolId);

    const user = this.userRepository.create({
      ...userData,
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
