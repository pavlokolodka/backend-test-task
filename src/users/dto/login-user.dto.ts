import { Type } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";
import { roles } from "src/roles/entity/roles.entity";

export class LoginUserDto {
  @IsString({message: 'Must be a string'})
  @IsEmail({}, { message: 'Invalid email message' })
  readonly email: string;
  @IsString({message: 'Must be a string'})
  @Length(4, 18, {message: 'Not less than 4 and not more than 18'})
  readonly password: string;
}