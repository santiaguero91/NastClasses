import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    classId: string;
} 