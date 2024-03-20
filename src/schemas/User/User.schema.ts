import { Schema,Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
    @Prop({required:true})
    name: string;
    @Prop({unique: true, required:true})
    email: string;
    @Prop({required:true})
    password: string;
    @Prop()
    school?: string;
    @Prop({ 
        type:[{type: mongoose.Schema.Types.ObjectId, ref:'Class'}]})
        classes: Class[];
}

@Schema()
export class Class {
    @Prop({required:true})
    name: string;
    @Prop({ 
        type:[{type: mongoose.Schema.Types.ObjectId, ref:'Student'}]})
        students: Student[];
}

@Schema()
export class Student {
    @Prop({required:true})
    name: string;
    @Prop()
    lastName: string;
    @Prop()
    presents?: string;
    @Prop()
    absents?: string;
}


export const UserSchema = SchemaFactory.createForClass(User)
export const ClassSchema = SchemaFactory.createForClass(Class)
export const StudentSchema = SchemaFactory.createForClass(Student)