import { IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsNumber()
  userId: number;
}
