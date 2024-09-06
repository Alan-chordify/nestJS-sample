import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class LoginDto {
	@ApiProperty({ description: 'email' })
  email: string;


  @ApiProperty({ description: 'password' })
  password: string;
}

class RegisterDto {

	@ApiProperty({ description: 'email' })
  email: string;

  @ApiProperty({ description: 'password' })
  password: string;

	@ApiProperty({ description: 'First Name' })
	firstName: string;

	@ApiProperty({ description: 'Last Name' })
	lastName: string;

}

@ApiTags('auth') 
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() req: LoginDto) {
    return this.authService.login(req);
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() req: RegisterDto) {
    return this.authService.register(req.email, req.password, req.firstName, req.lastName);
  }
}
