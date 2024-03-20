import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, Student } from 'src/schemas/User/User.schema';
import { CreateStudentDto } from './dto/CreateStudent';
import { UpdateStudentDto } from './dto/UpdateStudent';



@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        @InjectModel(Class.name) private classModel: Model<Class>
        ) {}

        /* async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
            const newStudent = new this.studentModel(createStudentDto);
            return await newStudent.save();
        }
 */
        async createStudent({ classId, ...createStudentDto }: CreateStudentDto): Promise<Student> {
            const findClass = await this.classModel.findById(classId)
            if (!findClass) throw new HttpException('User not found', 404);
            const newStudent = new this.classModel(createStudentDto);
            const savedStudent = await newStudent.save();
            const updatedClass = await findClass.updateOne({
                $push: {
                    students: savedStudent._id
                }
            })
            return updatedClass
        }
        async getStudent() {
            return this.studentModel.find().populate(['students']);;
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