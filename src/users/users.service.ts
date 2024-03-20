import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
        ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async getUsers() {
        return this.userModel.find().populate(['classes']);
    }

    
    async getUserById(id: string) {
        return this.userModel.findById(id).populate(['classes']);
    }
    async getupdateUser(id: string, UpdateUserDto:UpdateUserDto) {
       return this.userModel.findByIdAndUpdate(id , UpdateUserDto, {new:true} )
    }
    async deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id)
     }
}
