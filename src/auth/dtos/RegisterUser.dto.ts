import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsOptional } from "class-validator";


export class RegisterUserDTO {
    @Length(3)
    @ApiProperty()
    @IsString({message: 'Username field is required'})
    readonly username: string;

    @ApiProperty()
    @Length(6)
    @IsString({message: 'Password field is required'})
    readonly password: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;
}