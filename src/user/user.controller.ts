import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findUserByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
