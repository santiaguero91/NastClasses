import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema, Student, StudentSchema } from 'src/schemas/User/User.schema';
import { StudentsService } from './students.service';
import { StudentsControllers } from './students.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
      {
        name: Class.name,
        schema: ClassSchema,
      },
    ]),
  ],
  providers :[StudentsService],
  controllers: [StudentsControllers]
})
export class UsersModule {}