import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/CreateClass.dto';
import mongoose from 'mongoose';
import { UpdateClassDto } from './dto/UpdateClass.dto';


@Controller('classes')
export class ClassesControllers {
    constructor(private classService: ClassesService) {}

    
    @Post()
    createClass(@Body() CreateClassDto: CreateClassDto) {
      return this.classService.createClass(CreateClassDto);
    }
    @Get()
    getClasses() {
      return this.classService.getClasses();
    }
    @Get(':id')
    async getClassById(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('Class not Found', 404);
      const findClass = await this.classService.getClassById(id);
      if (!findClass) throw new HttpException('Class not found', 404);
      return findClass;
    }
    @Delete('id')
    async deleteClass(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('ID invalid', 404);
      const deleteUser = this.classService.deleteClass(id);
      if (!deleteUser) throw new HttpException('Class doesnt exsists', 404);
      return
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('id') id: string, @Body() UpdateClassDto: UpdateClassDto) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('ID invalid', 404);
      const updateClass = this.classService.UpdateClass(id, UpdateClassDto);
      if (!updateClass) throw new HttpException('User not Found', 404);
      return updateClass;
    }


}