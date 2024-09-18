import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { UsersModule } from '../users/users.module'; // Certifique-se de que o caminho está correto

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UsersModule], // Importe o UserModule
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}