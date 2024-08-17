import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Todo } from './entities/todo.entity';

interface ITodoService {
  create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo>;
  findAll(userId: number): Promise<Todo[]>;
  findOne(id: number, teste: number): Promise<Todo>;
  update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo>;
  delete(id: number): Promise<Todo>;
}

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTodoDto: CreateTodoDto, userId: number) {
    const { title } = createTodoDto;

    if (!title || title.trim() === '') {
      throw new BadRequestException(
        'The title cannot be empty or contain only spaces.',
      );
    }

    return this.prisma.todo.create({
      data: {
        title,
        done: false,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.prisma.todo.update({
        where: { id },
        data: updateTodoDto,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Todo with id ${id} not found`);
        }
      }
      throw err;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.todo.delete({ where: { id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Todo with id ${id} not found`);
        }
      }
      throw err;
    }
  }
}
