
import { User } from "src/users/entity/users.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./roles.entity";


@Entity({name: 'user_roles'})
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId!: number;

  @Column()
  roleId!: number;

  @ManyToOne(() => User, user => user.userRoles)
  public user!: User;

  @ManyToOne(() => Role, role => role.userRoles)
  public role!: Role;
}