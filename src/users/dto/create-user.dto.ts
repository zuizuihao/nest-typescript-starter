import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;
    @IsInt()
    age: number;
    @IsString()
    lastName: string;
}
