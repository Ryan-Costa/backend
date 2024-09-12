import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateTodoDto extends PartialType(
  OmitType(CreateTodoDto, ['userId']),
) {
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
