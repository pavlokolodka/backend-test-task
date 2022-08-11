import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';


@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}
  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    await this.roleRepository.save(role);
    return role;
  }

  async getByRole(findRole: string) {
    const role = this.roleRepository.findOne({where: {value: findRole} });
    return role;
  }
}
