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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersControllers {
  constructor(private usersService: UsersService) {}
  @Post()
  createUser(@Body() craeteUserDto: CreateUserDto) {
    return this.usersService.createUser(craeteUserDto);
  }
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not Found', 404);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('user not found', 404);
    return findUser;
  }


  
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('ID invalid', 404);
    const updateUser = this.usersService.getupdateUser(id, UpdateUserDto);
    if (!updateUser) throw new HttpException('User not Found', 404);
    return updateUser;
  }

  @Delete('id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('ID invalid', 404);
    const deleteUser = this.usersService.deleteUser(id);
    if (!deleteUser) throw new HttpException('User doesnt exsists', 404);
    return
  }
}
