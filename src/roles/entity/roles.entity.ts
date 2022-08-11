import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoles } from "./user-roles.entity";

export type roles = "Administrator" | "Boss" | "User";

@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: ["Administrator", "Boss", "User"]
  })
  value: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @OneToMany(() => UserRoles, userRoles => userRoles.role)
  public userRoles!: UserRoles[];
}