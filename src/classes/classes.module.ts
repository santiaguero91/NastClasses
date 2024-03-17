import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class , ClassSchema, User, UserSchema} from 'src/schemas/User/User.schema';
import { ClassesService } from './classes.service';
import { ClassesControllers } from './classes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers :[ ClassesService ],
  controllers: [ ClassesControllers ]

})
export class ClassModule {}
