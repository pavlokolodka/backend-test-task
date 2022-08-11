import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/entity/user-roles.entity';
import { UserPayloadDto } from './dto/user-payload.dto';
import { roles } from 'src/roles/entity/roles.entity';
import { ChangeBossDto } from './dto/change-boss.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRoles) private userRolesRopository: Repository<UserRoles>,
    private roleService: RolesService,
  ) {}
  
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    
    await this.userRepository.save(user);

    const role = await this.roleService.getByRole(dto.role);

    await this.userRolesRopository.save({
      user: user,
      role: role
    });
   
    return this.userRepository.findOne({where: {id: user.id}, relations: ['userRoles.role']}); 
  }

  async getUserByEmail(email: string): Promise<User>{
    const user = await this.userRepository.findOne({where: {email: email}, relations: ['userRoles', 'userRoles.role']});
    return user;
  }

  async getAll(user: UserPayloadDto) {
    const userRole = user.roles[0].value as unknown as roles;
    const userId = user.id;
    
    return await this.getDataByRole(userRole, userId);
  }

  async changeBoss(user: ChangeBossDto, reqUser: UserPayloadDto) {
    const subordinate = await this.userRepository.findOne({where: {id: user.userId}, relations: ['boss']});
    const boss = await this.userRepository.findOne({where: {boss: {id: user.newBoss}}, relations: ['boss']});

    if (!(subordinate && boss)) throw new HttpException(`user or boss with passed id is not found`, HttpStatus.NOT_FOUND);

    const reqUserRole = reqUser.roles[0].value as unknown as roles;
    const reqUserId = reqUser.id;
    
    if (reqUserRole === 'Boss' && subordinate.boss.id === reqUserId) {
      subordinate.boss.id = user.newBoss;
      const updatedUser = await this.userRepository.save(subordinate);
      return updatedUser;
    }

    throw new HttpException(`the user's role is not boss or the updated user is not a subordinate`, HttpStatus.BAD_REQUEST);
  }

  private async getDataByRole(userRole: roles, userId: number) {
    let users;
    switch(userRole) {
      case 'Administrator':
        users = await this.userRepository.find({relations: ['userRoles.role', 'boss']});
        return users;
      case 'Boss':
        const result = [];
        const boss = await this.userRepository.findOne({where: {id: userId}, relations: ['userRoles.role', 'boss']});
        result.push(boss);
        users = await this.userRepository.find({where: {boss: {id: userId}}, relations: ['userRoles.role', 'boss']});
        result.push(users);
        return result;
      case 'User':
        users = await this.userRepository.find({where: {id: userId}, relations: ['userRoles.role', 'boss']});
        return users;
    }
  } 
}
