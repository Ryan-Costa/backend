import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    const todo = await this.todoService.create(createTodoDto, userId);
    return {
      message: 'Todo created successfully',
      todo,
    };
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    const userId = user.id;
    return this.todoService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    await this.todoService.update(+id, updateTodoDto);
    return { message: `Todo with ID ${id} is updated` };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.todoService.delete(+id);

    return { message: `Todo with ID ${id} successfully deleted` };
  }
}
