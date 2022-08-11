import { IsNumberString } from "class-validator";

export class ChangeBossDto {
  @IsNumberString({message: 'Must be a number'})
  userId: number;
  @IsNumberString({message: 'Must be a number'})
  newBoss: number;
}