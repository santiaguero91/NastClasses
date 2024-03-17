import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsString()
    email?: string;
    @IsOptional()
    @IsString()
    password?: string;
    @IsOptional()
    @IsString()
    school?: string;
    @IsOptional()
    class?: string; 


}


/* 
@Prop({required:true})
name: string;
@Prop({unique: true, required:true})
email: string;
@Prop({required:true})
password: string;
@Prop()
school?: string;
@Prop()
class: string; 
*/