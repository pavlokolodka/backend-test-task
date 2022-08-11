import { UserRoles } from "src/roles/entity/user-roles.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({unique: true})
  email: string
 
  @Column()
  password: string

  @ManyToOne(() => User)
  @JoinColumn()
  boss: User

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserRoles, userRoles => userRoles.user)
  public userRoles!: UserRoles[];
}