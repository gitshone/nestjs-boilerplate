import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsOptional } from "class-validator";


export class AuthenticateUserDTO {
    @ApiProperty()
    @Length(3)
    @IsString()
    readonly username: string;

    @ApiProperty()
    @Length(6)
    @IsString()
    readonly password: string;
}