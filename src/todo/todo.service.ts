import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly usersService: UsersService,
  ) {}

  private async getUserById(userId: number): Promise<User> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createTodoDto: Partial<Todo>, userId: number): Promise<Todo> {
    const user = await this.getUserById(userId);
    const todo = this.todoRepository.create({
      ...createTodoDto,
      user,
    });
    return this.todoRepository.save(todo);
  }

  async findAll(userId: number): Promise<Todo[]> {
    const user = await this.getUserById(userId);
    return this.todoRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: number, userId: number): Promise<Todo | null> {
    const user = await this.getUserById(userId);
    return this.todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    await this.todoRepository.delete({ id, user: { id: user.id } });
  }

  async update(
    id: number,
    partialTodo: Partial<Todo>,
    userId: number,
  ): Promise<Todo | null> {
    // Encontrar a tarefa pelo ID e pelo usuário
    const todo = await this.todoRepository.findOne({
      where: {
        id: id,
        user: { id: userId }, // Ajuste para usar a relação com o usuário
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    // Atualizar a tarefa com as mudanças parciais
    Object.assign(todo, partialTodo);
    return this.todoRepository.save(todo);
  }
}