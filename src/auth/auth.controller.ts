import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/decorators/is-public.decorator';

@Controller('login')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('')
  @ApiOkResponse({ type: AuthEntity })
  SignIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password);
  }
}
