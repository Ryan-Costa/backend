import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTodoDto: CreateTodoDto, userId: number) {
    const { title } = createTodoDto;

    return this.prisma.todo.create({
      data: {
        title,
        done: false,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.todo.findMany({ where: { userId } });
  }

  findOne(id: number) {
    const todo = this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
