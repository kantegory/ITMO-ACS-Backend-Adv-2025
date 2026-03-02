import { Type } from "class-transformer"
import { IsEmail, IsString,IsOptional } from "class-validator"

export class UpdateUserDto
{
    @IsOptional()
    @IsEmail()
    @Type(() => String)
    email?: string

    @IsOptional()
    @IsString()
    @Type(() => String)
    name?: string

    @IsOptional()
    @IsString()
    @Type(() => String)
    password?: string
}
