import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ClassModule } from './classes/classes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://santi:admin@nestjsmongo.kcesms1.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule, 
    ClassModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
