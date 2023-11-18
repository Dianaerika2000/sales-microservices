import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create(createRolDto);
    return await this.rolRepository.save(rol);
  }

  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(id: number) {
    const rol = await this.rolRepository.findOneBy({ id });
    
    if (!rol) {
      throw new Error(`Rol with ID ${id} not found`);
    }

    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const rol = await this.rolRepository.preload({
      id: id,
      ...updateRolDto,
    });

    if (!rol) {
      throw new Error(`Rol with ID ${id} not found`);
    }

    return await this.rolRepository.save(rol);
  }

  async remove(id: number) {
    const rol = await this.findOne(id);
    
    return await this.rolRepository.remove(rol);
  }
}
