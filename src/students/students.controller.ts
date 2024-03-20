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
  import mongoose from 'mongoose';
import { CreateStudentDto } from './dto/CreateStudent';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/UpdateStudent';

  @Controller('students')
  export class StudentsControllers {
    constructor(private StudentsService: StudentsService) {}

    @Post()
    createStudent(@Body() CreateStudentDto: CreateStudentDto) {
      return this.StudentsService.createStudent(CreateStudentDto);
    }
    @Get()
    getStudent() {
      return this.StudentsService.getStudent();
    }
    @Get(':id')
    async getStudentById(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('Student not Found', 404);
      const findStudent = await this.StudentsService.getStudentById(id);
      if (!findStudent) throw new HttpException('Student not found', 404);
      return findStudent;
    }
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateStudent(@Param('id') id: string, @Body() UpdateStudentDto: UpdateStudentDto) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('ID invalid', 404);
      const updateStudent = this.StudentsService.updateStudent(id, UpdateStudentDto);
      if (!updateStudent) throw new HttpException('Student not Found', 404);
      return updateStudent;
    }
    @Delete('id')
    async deleteStudent(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('ID invalid', 404);
      const deleteStudent = this.StudentsService.deleteStudent(id);
      if (!deleteStudent) throw new HttpException('Student doesnt exsists', 404);
      return
    }
  }
