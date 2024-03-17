import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, User } from 'src/schemas/User/User.schema';
import { CreateClassDto } from './dto/CreateClass.dto';
import { UpdateClassDto } from './dto/UpdateClass.dto';

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<Class>,
        @InjectModel(User.name) private userModel: Model<User>
        ) {}

     async createClass({userId, ...CreateClassDto}: CreateClassDto): Promise<Class> {
         const findUser = await this.userModel.findById(userId)
         if(!findUser) throw new HttpException('User not found', 404);
        const newClass = new this.classModel(CreateClassDto);
        const savedClass = await newClass.save();
        const updatedUser = await findUser.updateOne({$push: { 
            classes: savedClass._id
         }})
         return updatedUser
    }
    async getClasses() {
        return this.classModel.find();
    }

    async getClassById(id: string) {
        return this.classModel.findById(id)
    }
    async deleteClass(id: string) {
        return this.classModel.findByIdAndDelete(id)
    }
    async UpdateClass(id: string, UpdateClassDto:UpdateClassDto) {
       return this.classModel.findByIdAndUpdate(id , UpdateClassDto, {new:true} )
    }
  
}
