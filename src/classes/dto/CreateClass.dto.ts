import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    userId: string

} 