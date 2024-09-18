import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from '../src/todo/todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '../src/todo/todo.entity'

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Adicione mais testes aqui
});