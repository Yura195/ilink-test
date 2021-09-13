import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
  readonly name: string;
  @Length(4,100,{message:"Password must be at least 4 digits"})
  readonly password: string;
  @IsEmail({},{message:"Email is incorrect"})
  readonly email: string;
}
