import { IsEmail, MaxLength, MinLength, IsIn,IsOptional,IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    name!: string;

    @IsEmail()
    @MaxLength(255)
    email!: string;

    @IsString()
    @MinLength(10)
    @MaxLength(2000)
    message!: string;

    @IsOptional()
    @IsIn(['fullstack', 'data', 'manager'])
    persona?: 'fullstack' | 'data' | 'manager'
}