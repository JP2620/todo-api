import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'todo_db.db',
    entities: [User],
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
