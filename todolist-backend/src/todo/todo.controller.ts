import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Certifique-se de que o caminho está correto
import { User } from '../users/user.decorator'; // Certifique-se de que o caminho está correto

@Controller('todos')
@UseGuards(JwtAuthGuard) // Aplica o guard globalmente neste controller
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() todo: Partial<Todo>,
    @User() user: any, // Substitua 'any' pelo tipo apropriado para o usuário
  ): Promise<Todo> {
    if (!user || !user.userId) {
      throw new BadRequestException('User ID is missing');
    }
    return this.todoService.create(todo, user.userId);
  }

  @Get()
  async findAll(@User() user: any): Promise<Todo[]> {
    if (!user || !user.userId) {
      throw new BadRequestException('User ID is missing');
    }
    return this.todoService.findAll(user.userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<Todo | null> {
    if (!user || !user.userId) {
      throw new BadRequestException('User ID is missing');
    }
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.todoService.findOne(numericId, user.userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() partialTodo: Partial<Todo>,
    @User() user: any,
  ): Promise<Todo | null> {
    if (!user || !user.userId) {
      throw new BadRequestException('User ID is missing');
    }
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.todoService.update(numericId, partialTodo, user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: any): Promise<void> {
    if (!user || !user.userId) {
      throw new BadRequestException('User ID is missing');
    }
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.todoService.delete(numericId, user.userId);
  }
}