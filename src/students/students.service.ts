import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/schemas/User/User.schema';
import { CreateStudentDto } from './dto/CreateStudent';
import { UpdateStudentDto } from './dto/UpdateStudent';



@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>
        ) {}
        async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
            const newStudent = new this.studentModel(createStudentDto);
            return await newStudent.save();
        }

        async getStudent() {
            return this.studentModel.find();
        }
        async getStudentById(id: string) {
            return this.studentModel.findById(id)
        }
        async updateStudent(id: string, UpdateStudentDto:UpdateStudentDto) {
            return this.studentModel.findByIdAndUpdate(id , UpdateStudentDto, {new:true} )
         }
         async deleteStudent(id: string) {
            return this.studentModel.findByIdAndDelete(id)
         }
}