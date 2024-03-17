import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User/User.schema';
import { UsersService } from './users.service';
import { UsersControllers } from './users.controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers :[ UsersService],
  controllers: [UsersControllers]

})
export class UsersModule {}
